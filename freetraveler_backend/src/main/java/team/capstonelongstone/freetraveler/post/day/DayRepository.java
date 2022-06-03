package team.capstonelongstone.freetraveler.post.day;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.post.board.Board;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface DayRepository extends JpaRepository<Day, Long> {

    List<Day> findAllByBoard(Board board);

    @Query("select d from Day as d where d.board.id = :boardId and d.day = :day")
    Optional<Day> findByBoardIdAndDay(@Param("boardId")Long boardId,
                                       @Param("day")int day);

    @Query("select d from Day as d where d.board.id = :boardId")
    List<Day> findAllByBoardId(Long boardId);

}
