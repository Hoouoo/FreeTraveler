package team.capstonelongstone.freetraveler.good.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.Board;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Good {

    @Id @GeneratedValue
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "ACCOUNT_ID")
    private Account account;

    public Good(Board board, Account account) {
        this.board = board;
        this.account = account;
    }
}
