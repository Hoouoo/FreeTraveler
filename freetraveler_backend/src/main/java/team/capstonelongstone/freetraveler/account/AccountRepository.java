package team.capstonelongstone.freetraveler.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.account.domain.Account;

/**
 * @author 박성호
 * 회원가입 관련 Repository
 */
@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUserId(String userId);

    @Query("select a.userName from Account as a where a.userId = :userId")
    String getUserName(@Param("userId") String userId);
}

