package team.capstonelongstone.freetraveler.account.domain;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Account extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String userId;
    String userPassword;

    @Enumerated(EnumType.STRING)
    RoleType roleType;

    @Builder
    public Account(Long id, String userId, String userPassword, RoleType roleType) {
        this.id = id;
        this.userId = userId;
        this.userPassword = userPassword;
        this.roleType = roleType;
    }
}
