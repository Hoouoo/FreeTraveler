package team.capstonelongstone.freetraveler.good;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import team.capstonelongstone.freetraveler.good.dto.GoodDTO;

import java.util.HashMap;
import java.util.Map;

@Controller
public class GoodController {

    private final GoodService goodService;

    @Autowired
    public GoodController(GoodService goodService) {
        this.goodService = goodService;
    }

    @PostMapping("/post/good")
    @ResponseBody
    public ResponseEntity good(@RequestBody GoodDTO goodDTO){

        Map good = new HashMap<String, String>(); //JSON변환
        good.put("boardId", goodDTO.getBoardId());
        good.put("accountId", goodDTO.getUserId());

        if(goodDTO.getAction().equals("good")){
            int goodCnt = goodService.good(goodDTO);
            good.put("currentGood", goodCnt);

        }else{
            int goodCnt = goodService.cancelGood(goodDTO);
            good.put("currentGood", goodCnt);
        }
        return new ResponseEntity(good, HttpStatus.OK);
    }

}
