package team.capstonelongstone.freetraveler.post;

import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardService;
import team.capstonelongstone.freetraveler.post.day.DayService;
import team.capstonelongstone.freetraveler.post.img.ImgService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
public class PostController {


    private final BoardService boardService;

    private final DayService dayService;

    @PostMapping("/post")
    public String generateBoard(HttpServletRequest request, @RequestParam("repImg")MultipartFile file) throws JSONException, IOException {

        Board board = boardService.generateBoard(request, file);

        dayService.generateDay(request,board);

        return "/map.html";
    }



}
