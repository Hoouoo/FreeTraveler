package team.capstonelongstone.freetraveler.post.place;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    @ManyToOne
    @JoinColumn(name="BOARD_ID")
    private Board board;

    @ManyToOne
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
    @Lob
    private String placeImage;

    @Builder
    public Place(Board board, Day day,String name, String address, Integer cost, String review, String transportation, Double lat, Double lng, String placeImage) {
        this.board = board;
        this.day = day;
        this.name=name;
        this.address = address;
        this.cost = cost;
        this.review = review;
        this.transportation = transportation;
        this.lat = lat;
        this.lng = lng;
        this.placeImage = placeImage;
    }
}
