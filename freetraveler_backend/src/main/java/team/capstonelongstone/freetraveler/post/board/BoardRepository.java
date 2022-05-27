package team.capstonelongstone.freetraveler.post.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long>{

    @Query("select b from Board as b where b.id=:boardId")
    Board findByBoardId(@Param("boardId")Long boardId);

    //pick이 all일 때
    @Query("select b from Board as b where :method like %:search%")
    Page<Board> findAllPickAll(Pageable pageable,
                               @Param("method")String method,
                               @Param("search")String search);

    @Query("select b from Board as b where b.id in (select p.board.id from Pick as p where p.pickStatus=:pick and p.account.id = :authorId and :method like %:search% )")
    Page<Board> findAllPick(Pageable pageable,
                            @Param("authorId")Long authorId,
                            @Param("method")String method,
                            @Param("search")String search,
                            @Param("pick")String pick);
}
