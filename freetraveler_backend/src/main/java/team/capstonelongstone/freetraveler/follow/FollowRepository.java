package team.capstonelongstone.freetraveler.follow;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.follow.domain.Follow;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    List<Follow> findByAccount(Account account);

    @Query("select f from Follow as f where f.account.userId = :targetId")
    List<Follow> listMyId(@Param("targetId") String targetId);

}
