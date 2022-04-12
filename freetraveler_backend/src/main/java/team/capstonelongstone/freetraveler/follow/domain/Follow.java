package team.capstonelongstone.freetraveler.follow.domain;

import lombok.NoArgsConstructor;
import team.capstonelongstone.freetraveler.account.domain.Account;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class Follow {

    @Id @GeneratedValue
    @Column(name="FOLLOW_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    Account account;

    private String targetId;

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getTargetId() {
        return targetId;
    }

    public void setTargetId(String targetId) {
        this.targetId = targetId;
    }
}
