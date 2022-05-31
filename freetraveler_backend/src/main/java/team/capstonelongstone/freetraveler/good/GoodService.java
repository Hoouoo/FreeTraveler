package team.capstonelongstone.freetraveler.good;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import team.capstonelongstone.freetraveler.account.AccountRepository;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.good.domain.Good;
import team.capstonelongstone.freetraveler.good.dto.GoodDTO;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import java.util.Objects;

@Service
public class GoodService {


    private final BoardRepository boardRepository;
    private final AccountRepository accountRepository;
    private final GoodRepository goodRepository;
    private final EntityManagerFactory entityManagerFactory;

    @Autowired
    public GoodService(BoardRepository boardRepository, AccountRepository accountRepository, GoodRepository goodRepository, EntityManagerFactory entityManagerFactory) {
        this.boardRepository = boardRepository;
        this.accountRepository = accountRepository;
        this.goodRepository = goodRepository;
        this.entityManagerFactory = entityManagerFactory;
    }

    public int good(GoodDTO goodDTO){ //좋아요
        Good byAccountId = goodRepository.findByAccountId(goodDTO.getUserId());

        if(Objects.isNull(byAccountId)) { //좋아요
            Account account = accountRepository.findByUserId(goodDTO.getUserId());
            Board board = boardRepository.findByBoardId(goodDTO.getBoardId().longValue());
            Good good=new Good(board, account);
            goodRepository.save(good);
            return updateGoodCnt(goodDTO.getBoardId().longValue(),"good");
        }else{
            return updateGoodCnt(goodDTO.getBoardId().longValue(),"no");
        }

    }

    public int cancelGood(GoodDTO goodDTO){
        Good byAccountId = goodRepository.findByAccountId(goodDTO.getUserId());

        if(Objects.nonNull(byAccountId)){
            goodRepository.delete(byAccountId);
            return updateGoodCnt(goodDTO.getBoardId().longValue(),"cancel");
        }else{
            return updateGoodCnt(goodDTO.getBoardId().longValue(),"no");
        }
    }

    public int updateGoodCnt(Long id,String type){
        EntityManager em=entityManagerFactory.createEntityManager();
        EntityTransaction tx=em.getTransaction();
        tx.begin();

        Board byBoardId = em.find(Board.class, id);
        Integer goodCnt = byBoardId.getGoodCnt();
        if(type.equals("good")){
            goodCnt++;
        }else if(type.equals("cancel")){
            goodCnt--;
        }
        else{
            goodCnt=goodCnt;
        }
        byBoardId.changeGoodCnt(goodCnt);
        tx.commit();
        return goodCnt;
    }

    public Good returnGoodStatus(Account account,Board board){
        return goodRepository.findByAccountAndBoard(account,board);
    }


}
