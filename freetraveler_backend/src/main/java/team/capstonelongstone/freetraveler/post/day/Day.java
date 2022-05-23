package team.capstonelongstone.freetraveler.post.day;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import team.capstonelongstone.freetraveler.post.board.Board;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Day {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "DAY_ID")
    private Long id;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    private Integer day;

    @Builder
    public Day(Board board, Integer day) {
        this.board = board;
        this.day = day;
    }
}
