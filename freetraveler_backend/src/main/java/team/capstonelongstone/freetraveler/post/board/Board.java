package team.capstonelongstone.freetraveler.post.board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.account.domain.BaseTime;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Board extends BaseTime {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOARD_ID")
    private Long id;
    private String postName;
    private Integer totalDays;
    private String totalTrans;
    private Integer totalCost;
    private String comment;
    private Integer goodCnt;

    @ManyToOne
    @JoinColumn(name = "ACCOUNT_ID")
    private Account author;

    private String repImgPath;
    private String repImgName;

    @Builder
    public Board(String postName, Integer totalDays, String totalTrans, Integer totalCost, String comment, Integer goodCnt, Account author, String repImgPath, String repImgName) {
        this.postName = postName;
        this.totalDays = totalDays;
        this.totalTrans = totalTrans;
        this.totalCost = totalCost;
        this.comment = comment;
        this.goodCnt = goodCnt;
        this.author = author;
        this.repImgPath = repImgPath;
        this.repImgName = repImgName;
    }

    public void changeGoodCnt(Integer goodCnt) {
        this.goodCnt = goodCnt;
    }
}
