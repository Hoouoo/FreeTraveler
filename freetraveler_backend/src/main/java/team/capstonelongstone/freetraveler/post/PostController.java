package team.capstonelongstone.freetraveler.post;

import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;
import team.capstonelongstone.freetraveler.post.board.BoardService;
import team.capstonelongstone.freetraveler.post.board.dto.PostListDTO;
import team.capstonelongstone.freetraveler.post.day.DayService;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;

/**
 * @author 정순범
 * 게시물 관련 서비스
 */
@Controller
@RequiredArgsConstructor
public class PostController {


    private final BoardService boardService;

    private final DayService dayService;

    private final PostService postService;

    private final BoardRepository boardRepository;

    /**
     * 게시물 등록
     */
    @PostMapping("/post") 
    @ResponseBody
    public ResponseEntity generateBoard(HttpServletRequest request, @RequestParam("repImg")MultipartFile file) throws JSONException, IOException {

        String mode = request.getParameter("mode");
        if (mode.equals("write")) { //게시글 등록
            try {
                Board board = boardService.generateBoard(request, file);
                dayService.generateDay(request, board);

                HashMap<String,Integer> boardId=new HashMap<>();
                boardId.put("id",board.getId().intValue());

                return new ResponseEntity(boardId,HttpStatus.valueOf(201));
            } catch (Exception e) {
                return new ResponseEntity(HttpStatus.valueOf(409));
            }
        }
        else{ //게시글 수정
            System.out.println("게시글 수정");
            return new ResponseEntity(HttpStatus.valueOf(201)); //로그인 성공시 userId 넘김
        }
    }

    /**
     * 게시물 조회
     */
    @GetMapping("/post")
    @ResponseBody
    public ResponseEntity getPost(@RequestParam("id")String boardId) throws JSONException, IOException {
        System.out.println(boardId);
        String post = postService.getPost(boardId);
        return new ResponseEntity(post,HttpStatus.valueOf(200));
    }

    /**
     * 게시물 삭제
     */
    @DeleteMapping("/post")
    public ResponseEntity deletePost(@RequestBody HashMap<String,String >id){
        String boardId = id.get("id");
        try {
            postService.deletePost(boardId); //board 지우면 day, place 같이 지워짐
            return new ResponseEntity(HttpStatus.valueOf(201));
        }catch (Exception e){
            return new ResponseEntity(HttpStatus.valueOf(409));
        }
    }

    /**
     * 이미지 가져오기
     */
    @GetMapping(value = "/{boardImg}", produces = MediaType.IMAGE_JPEG_VALUE) //이미지 접근 링크
    public ResponseEntity<byte[]> files(@RequestParam String boardImg) throws Exception {
        String fileDir = boardImg;
        File file=new File(fileDir);
        HttpHeaders header = new HttpHeaders();

        header.add("Content-type", Files.probeContentType(file.toPath()));

        return new ResponseEntity(FileCopyUtils.copyToByteArray(file), header, HttpStatus.OK);
    }


    /**
     * 게시물 조회 리스트 출력
     */
    @GetMapping("/post/list")
    @ResponseBody
    public String getPostList(PostListDTO postListDTO,HttpServletRequest request) throws JSONException {
        return boardService.getPostList(postListDTO,request);
    }

}
