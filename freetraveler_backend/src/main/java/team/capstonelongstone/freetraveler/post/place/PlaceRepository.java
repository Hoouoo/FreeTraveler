package team.capstonelongstone.freetraveler.post.place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.day.Day;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place,Long> {

    List<Place> findAllByDay(Day dayId);
}
