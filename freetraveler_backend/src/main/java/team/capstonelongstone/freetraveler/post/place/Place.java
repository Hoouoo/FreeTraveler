package team.capstonelongstone.freetraveler.post.place;

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

    @Builder
    public Place(Day day, String name, String address, Integer cost, String review, String transportation, Double lat, Double lng, String placeImgPath, String placeImgName) {
        this.day = day;
        this.name = name;
        this.address = address;
        this.cost = cost;
        this.review = review;
        this.transportation = transportation;
        this.lat = lat;
        this.lng = lng;
        this.placeImgPath = placeImgPath;
        this.placeImgName = placeImgName;
    }
}
