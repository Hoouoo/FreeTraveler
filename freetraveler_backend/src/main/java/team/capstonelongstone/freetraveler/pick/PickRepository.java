package team.capstonelongstone.freetraveler.pick;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.pick.domain.Pick;
import team.capstonelongstone.freetraveler.post.board.Board;

@Repository
public interface PickRepository extends JpaRepository<Pick,Long> {

    @Query("select p from Pick as p where p.account.userId = :userId and p.board.id = :boardId")
    Pick findByUserIdAndBoardId(@Param("userId")String userId,
                                @Param("boardId")Long boardId);

    @Query("select p from Pick as p where p.account=:account and p.board=:board")
    Pick findByUserAndBoard(@Param("account") Account account,
                            @Param("board") Board board);

}
