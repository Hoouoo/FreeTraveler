package team.capstonelongstone.freetraveler.post.place;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.day.Day;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place,Long> {

    List<Place> findAllByDay(Day dayId);


    @Query("select p from Place as p where p.day.id=:id")
    List<Place> findAllBYDayId(@Param("id")Long id);

    @Query("select p.id from Place as p where p.day.id = :dayId")
    List<Long> listPlaceIdByDay(@Param("dayId") Long dayId);

}
