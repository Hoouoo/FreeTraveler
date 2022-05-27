package team.capstonelongstone.freetraveler.pick;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import team.capstonelongstone.freetraveler.pick.dto.PickDTO;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 정순범
 * 게시글 픽 컨트롤러
 */
@Controller
public class PickController {

    private final PickService pickService;

    @Autowired
    public PickController(PickService pickService) {
        this.pickService = pickService;
    }


    @PostMapping("/post/pick")
    @ResponseBody
    public ResponseEntity pick(@RequestBody PickDTO pickDTO){

        Map pick = new HashMap<String, String>(); //JSON변환
        pick.put("boardId", pickDTO.getBoardId());
        pick.put("accountId", pickDTO.getUserId());

        if(pickDTO.getAction().equals("pick")) {
            pickService.pick(pickDTO);
            return new ResponseEntity(pick, HttpStatus.OK);
        }else{ //픽 취소
            pickService.cancelPic(pickDTO);
            return new ResponseEntity(pick, HttpStatus.OK);
        }
    }

}
