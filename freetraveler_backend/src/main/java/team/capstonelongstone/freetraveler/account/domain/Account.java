package team.capstonelongstone.freetraveler.account.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author  박성호
 * Account 객체 Entity
 */

@Entity
@Getter
@NoArgsConstructor
public class Account extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String userId;
    String userPassword;
    String userName;

    @Enumerated(EnumType.STRING)
    RoleType roleType;

    @Builder
    public Account(String userId, String userPassword, String userName, RoleType roleType) {
        this.userId = userId;
        this.userPassword = userPassword;
        this.userName = userName;
        this.roleType = roleType;
    }
}
