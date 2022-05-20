package team.capstonelongstone.freetraveler.post;

import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardService;
import team.capstonelongstone.freetraveler.post.day.DayService;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;

@Controller
@RequiredArgsConstructor
public class PostController {


    private final BoardService boardService;

    private final DayService dayService;

    private final PostService postService;

    @PostMapping("/post") //게시물 등록
    public ResponseEntity generateBoard(HttpServletRequest request, @RequestParam("repImg")MultipartFile file) throws JSONException, IOException {

        String mode = request.getParameter("mode");
        if (mode.equals("write")) { //게시글 등록

            try {
                Board board = boardService.generateBoard(request, file);

                dayService.generateDay(request, board);
                return new ResponseEntity(HttpStatus.valueOf(201));
            } catch (Exception e) {
                return new ResponseEntity(HttpStatus.valueOf(409));
            }
        }
        else{ //게시글 수정
            System.out.println("게시글 수정");
            return new ResponseEntity(HttpStatus.valueOf(201)); //로그인 성공시 userId 넘김
        }
    }

    @GetMapping("/post") //게시물조회
    @ResponseBody
    public ResponseEntity getPost(@RequestBody HashMap<String,String> id) throws JSONException, IOException {
        String boardId = id.get("id");
        String post = postService.getPost(boardId);
        return new ResponseEntity(post,HttpStatus.valueOf(200));
    }

    @GetMapping(value = "/{boardImg}", produces = MediaType.IMAGE_JPEG_VALUE) //이미지 접근 링크
    public ResponseEntity<byte[]> files(@RequestParam String boardImg) throws Exception {
        String fileDir = boardImg;
        File file=new File(fileDir);
        HttpHeaders header = new HttpHeaders();

        header.add("Content-type", Files.probeContentType(file.toPath()));

        return new ResponseEntity(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
    }



}
