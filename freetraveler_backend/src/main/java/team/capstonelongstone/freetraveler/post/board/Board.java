package team.capstonelongstone.freetraveler.post.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.capstonelongstone.freetraveler.account.domain.Account;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_ID")
    private Long id;
    private String postName;
    private Integer totalDays;
    private Integer totalCost;
    private String comment;
    private Integer pickCnt;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account author;

    @Lob
    private String refImg;

    @Builder
    public Board(String postName, Integer totalDays, Integer totalCost, String comment, Integer pickCnt, Account author, String refImg) {
        this.postName = postName;
        this.totalDays = totalDays;
        this.totalCost = totalCost;
        this.comment = comment;
        this.pickCnt = pickCnt;
        this.author = author;
        this.refImg = refImg;
    }
}
