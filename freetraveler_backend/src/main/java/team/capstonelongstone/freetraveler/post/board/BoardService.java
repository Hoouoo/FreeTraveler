package team.capstonelongstone.freetraveler.post.board;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.img.ImgService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashSet;
import java.util.List;

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

    public void saveBoard(Board target) {
        boardRepository.save(target);
    }

}
