package team.capstonelongstone.freetraveler.pick.domain;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.Board;

import javax.persistence.*;

@Entity
@NoArgsConstructor
public class Pick {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ColumnDefault("false")
    private String pickStatus;

    public Pick(Account account, Board board, String pickStatus) {
        this.account = account;
        this.board = board;
        this.pickStatus = pickStatus;
    }
}
