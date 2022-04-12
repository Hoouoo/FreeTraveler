package team.capstonelongstone.freetraveler.follow;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import team.capstonelongstone.freetraveler.account.AccountRepository;
import team.capstonelongstone.freetraveler.interceptor.CheckSession;

import javax.servlet.http.HttpServletRequest;

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
    public ResponseEntity addFollow(HttpServletRequest request, String targetId){
        return followService.addFollow(request,targetId);
    }

    @CheckSession
    @DeleteMapping("/follow")
    public ResponseEntity deleteFollow(HttpServletRequest request,String targetId){
        return followService.deleteFollow(request, targetId);
    }

}
