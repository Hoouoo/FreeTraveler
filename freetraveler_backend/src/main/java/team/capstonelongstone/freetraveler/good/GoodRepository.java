package team.capstonelongstone.freetraveler.good;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.good.domain.Good;
import team.capstonelongstone.freetraveler.post.board.Board;

@Repository
public interface GoodRepository extends JpaRepository<Good,Long> {

    @Query("select g from Good as g where g.account.userId = :userId")
    Good findByAccountId(@Param("userId")String userId);

    @Query("select g from Good as g where g.account = :account and g.board =:board")
    Good findByAccountAndBoard(@Param("account")Account account,
                                   @Param("board") Board board);

}
