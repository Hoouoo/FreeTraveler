package team.capstonelongstone.freetraveler.pick;

import org.hibernate.annotations.ColumnDefault;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.Board;

import javax.persistence.*;

@Entity
public class Pick {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ColumnDefault("false")
    private String pickStatus;

}
