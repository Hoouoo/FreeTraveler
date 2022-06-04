package team.capstonelongstone.freetraveler.follow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import team.capstonelongstone.freetraveler.account.AccountRepository;
import team.capstonelongstone.freetraveler.follow.dto.FollowResponseDto;
import team.capstonelongstone.freetraveler.interceptor.CheckSession;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/**
 * @author 정순범
 * 친구 추가 기능 컨트롤러
 */
@Controller
public class FollowController {

    private final FollowService followService;

    @Autowired
    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @CheckSession
    @PostMapping("/follow")
    public ResponseEntity addFollow(HttpServletRequest request,@RequestBody  HashMap<String, String> id){

        return followService.addFollow(request,id.get("id"));
    }

    @CheckSession
    @DeleteMapping("/follow")
    public ResponseEntity deleteFollow(HttpServletRequest request, @RequestBody HashMap<String, HashMap<String, String>> id){
        String targetId = id.get("data").get("id");

        return followService.deleteFollow(request, targetId);
    }

    @CheckSession
    @PostMapping("/follow/list")
    public ResponseEntity<?> getFollowList(@RequestBody HashMap<String, String> targetId){
        List<FollowResponseDto> targetList = followService.listFollow(targetId.get("id"));
        if(Objects.isNull(targetList)){
            return ResponseEntity.badRequest().body("잘못된 접근입니다.");
        }
        return ResponseEntity.ok().body(targetList);
    }


}
