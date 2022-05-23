package team.capstonelongstone.freetraveler.post.board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {

    @Query("select b from Board as b where b.id=:boardId")
    Board findByBoardId(@Param("boardId")Long boardId);

}
