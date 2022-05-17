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
        Account author = account;
        int sumTotalCost = 0;
        HashSet<String> setTrans = new HashSet<>();

        for (int day=0;day<totalDays;day++) {
            String varPlength = day + "_plength";
            Integer _plength = Integer.valueOf(request.getParameter(varPlength));
            for (int j = 0; j < _plength; j++) {
                String targetTrans = request.getParameter(day + "_" + j + "_" + "trans");
                setTrans.add(targetTrans);
                Integer cost = Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost"));
                sumTotalCost+=cost;
            }
        }

        String boardTargetImg = imgService.boardSaveImg(request, file);

        Board board = Board.builder().postName(postName).totalDays(totalDays).totalCost(sumTotalCost).comment(comment).pickCnt(0)
                .author(author).refImg(boardTargetImg).build();
        saveBoard(board);
        return board;
    }

    public void saveBoard(Board target) {
        boardRepository.save(target);
    }

}
