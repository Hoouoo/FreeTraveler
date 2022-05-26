package team.capstonelongstone.freetraveler.post.board;

import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.dto.PostListDTO;
import team.capstonelongstone.freetraveler.post.img.ImgService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
/**
 * @author 정순범, 박성호
 * 보드 생성 및 저장
 */
@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final ImgService imgService;

    /**
     * 보드 생성 및 이미지 저장
     */
    public Board generateBoard(HttpServletRequest request, @RequestParam("repImg")MultipartFile file) throws IOException {

        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");

        String postName = request.getParameter("postName");
        Integer totalDays = Integer.valueOf(request.getParameter("totalDays"));
        String comment = request.getParameter("comment");
        String totalTrans=request.getParameter("totalTrans");

        Account author = account;
        int sumTotalCost = 0;

        for (int day=0;day<totalDays;day++) {
            String varPlength = day + "_plength";
            Integer _plength = Integer.valueOf(request.getParameter(varPlength));
            for (int j = 0; j < _plength; j++) {
                Integer cost = Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost"));
                sumTotalCost+=cost;
            }
        }

        List<String> list = imgService.boardSaveImg(request, file);

        Board board = Board.builder().postName(postName).totalDays(totalDays).totalCost(sumTotalCost).comment(comment).pickCnt(0)
                .author(author).totalTrans(totalTrans).repImgPath(list.get(0)).repImgName(list.get(1)).build();
        saveBoard(board);
        return board;
    }

    /**
     * 보드 저장
     */
    public void saveBoard(Board target) {
        boardRepository.save(target);
    }

    /**
     * 게시글 조회 리스트 출력
     */
    public String getPostList(PostListDTO postListDTO,HttpServletRequest request) throws JSONException {

        if(Objects.isNull(postListDTO.getSearch())){
            postListDTO.setSearch("");
        }

        String pick="";
        if(postListDTO.getIsMyPick().equals("") ||postListDTO.getIsMyPick().equals("all" )){
            pick="all";
        } else if (postListDTO.getIsMyPick().equals("pick")){
            pick="true";
        }else{
            pick="false";
        }

        if(postListDTO.getMethod().equals("")){
            postListDTO.setMethod("title");
        }else if(postListDTO.getMethod().equals("author")){
            postListDTO.setMethod("b.author.userName");
        }

        Sort sort = null;
        if(postListDTO.getOrderBy().equals("asc")) {
            if(postListDTO.getSort().equals("recent")) {
                sort = Sort.by(Sort.Direction.ASC, "createdDate");
            }
            else{

            }
        }
        else{
            if(postListDTO.getSort().equals("recent")){
                sort = Sort.by(Sort.Direction.DESC, "createdDate");
            }
            else{
                sort = Sort.by(Sort.Direction.DESC, "pickCnt");
            }
        }

        HttpSession session=request.getSession();
        Account account = (Account) session.getAttribute("account");

        Pageable pageable= PageRequest.of(postListDTO.getPage(), postListDTO.getPageSize(),sort);

        Page<Board> all=null;
        if(pick.equals("all")){//pick all 일때
            all = boardRepository.findAllPickAll(pageable,postListDTO.getMethod(),postListDTO.getSearch());
        }else {
            all = boardRepository.findAllPick(pageable, account.getId(), postListDTO.getMethod(), postListDTO.getSearch(), pick);
        }

        List<Board> allBoard = boardRepository.findAll();
        int boardSize = allBoard.size();


        //json
        JSONObject page=new JSONObject();
        page.put("page",postListDTO.getPage());
        page.put("max",Math.ceil(boardSize/postListDTO.getPageSize()));
        page.put("pageSize",postListDTO.getPageSize());
        page.put("totalPost",boardSize);

        JSONArray array=new JSONArray();
        for (Board board : all) {

            JSONObject post = new JSONObject();
            post.put("id",board.getId());
            post.put("author",board.getAuthor().getUserId());
            post.put("repimg",board.getRepImgName());
            post.put("postName",board.getPostName());
            post.put("totalCost",board.getTotalCost());
            post.put("totalDays",board.getTotalDays());
            post.put("totalTrans",board.getTotalTrans());
            post.put("comment",board.getComment());
            post.put("good",board.getPickCnt());
            post.put("isPick","false");
            array.put(post);
            page.put("post",array);
        }

        return page.toString();
    }

}
