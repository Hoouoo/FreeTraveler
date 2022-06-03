package team.capstonelongstone.freetraveler.post.board.dto;

import lombok.*;
import team.capstonelongstone.freetraveler.account.domain.Account;
import team.capstonelongstone.freetraveler.post.board.Board;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {

    private String postName;
    private int totalDays;
    private String totalTrans;
    private int totalCost;
    private String comment;
    private int goodCnt;
    private Account author;
    private String repImgPath;
    private String repImgName;

    public Board toEntity(Long id){
        return Board.builder().id(id).postName(postName).totalDays(totalDays).totalTrans(totalTrans)
                .totalCost(totalCost).comment(comment).goodCnt(goodCnt).author(author).repImgPath(repImgPath).repImgName(repImgName).build();
    }

}
