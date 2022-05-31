package team.capstonelongstone.freetraveler.pick;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.capstonelongstone.freetraveler.account.AccountRepository;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.pick.domain.Pick;
import team.capstonelongstone.freetraveler.pick.dto.PickDTO;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;

import java.util.Objects;


/**
 * @author 정순범
 * 게시글 픽 기능, 삭제
 */

@Service
public class PickService {

    private final PickRepository pickRepository;
    private final AccountRepository accountRepository;
    private final BoardRepository boardRepository;
    
    @Autowired
    public PickService(PickRepository pickRepository, AccountRepository accountRepository, BoardRepository boardRepository) {
        this.pickRepository = pickRepository;
        this.accountRepository = accountRepository;
        this.boardRepository = boardRepository;
    }
    
    /**
     * 게시글 픽
     */
    public void pick(PickDTO pickDTO){
        Pick byUserIdAndBoardId = pickRepository.findByUserIdAndBoardId(pickDTO.getUserId(), pickDTO.getBoardId().longValue());

        if(Objects.isNull(byUserIdAndBoardId)){ //픽 한 내용이 없을 때
            Account account = accountRepository.findByUserId(pickDTO.getUserId());
            Board board = boardRepository.findByBoardId(pickDTO.getBoardId().longValue());
            Pick pick=new Pick(account,board,"true");
            pickRepository.save(pick);
        }
    }

    /**
     * 게시글 픽 취소
     */
    public void cancelPic(PickDTO pickDTO){
        Pick byUserIdAndBoardId = pickRepository.findByUserIdAndBoardId(pickDTO.getUserId(), pickDTO.getBoardId().longValue());

        if(Objects.nonNull(byUserIdAndBoardId)){
            pickRepository.delete(byUserIdAndBoardId);
        }

    }

}
