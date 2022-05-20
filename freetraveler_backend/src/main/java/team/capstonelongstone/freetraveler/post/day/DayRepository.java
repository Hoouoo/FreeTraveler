package team.capstonelongstone.freetraveler.post.day;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.post.board.Board;

import java.util.List;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {

    List<Day> findAllByBoard(Board board);

}
