package team.capstonelongstone.freetraveler.post.place;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.day.Day;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLACE_ID")
    Long id;

//    @ManyToOne
//    @JoinColumn(name="BOARD_ID")
//    private Board board;

    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="DAY_ID")
    private Day day;

    private String name;
    private String address;
    private Integer cost;

    @Lob
    private String review;

    private String transportation;
    private Double lat;
    private Double lng;

    private String placeImgPath;
    private String placeImgName;
}
