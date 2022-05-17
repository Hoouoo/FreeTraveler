package team.capstonelongstone.freetraveler.post.transportation;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import team.capstonelongstone.freetraveler.post.board.Board;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Transportation {

    @Id
    @GeneratedValue(strategy  = GenerationType.IDENTITY)
    @Column(name = "TRANSPORTATION_ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name="BOARD_ID")
    private Board boardId;


    private String howToTravel;

    @Builder
    public Transportation(Board boardId, String howToTravel) {
        this.boardId = boardId;
        this.howToTravel = howToTravel;
    }
}
