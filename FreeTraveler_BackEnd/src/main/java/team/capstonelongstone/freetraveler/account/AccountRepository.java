package team.capstonelongstone.freetraveler.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.account.domain.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    Account findByUserId(String userId);
}

