package team.capstonelongstone.freetraveler.post.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long>{

    @Query("select b from Board as b where b.id=:boardId")
    Board findByBoardId(@Param("boardId")Long boardId);

    //pick이 all일 때
    @Query("select b from Board as b where b.author.userId like %:search%")
    Page<Board> findAllPickAllByAuthor(Pageable pageable,
                               @Param("search")String search);

    @Query("select b from Board as b where b.postName like %:search%")
    Page<Board> findAllPickAllByTitle(Pageable pageabl,
                                       @Param("search")String search);

    @Query("select b from Board as b where b.id in (select p.board.id from Pick as p where p.pickStatus=:pick and p.account.id = :authorId and b.author.userId like %:search% )")
    Page<Board> findAllPickByAuthor(Pageable pageable,
                            @Param("authorId")Long authorId,
                            @Param("search")String search,
                            @Param("pick")String pick);

    @Query("select b from Board as b where b.id in (select p.board.id from Pick as p where p.pickStatus=:pick and p.account.id = :authorId and b.postName like %:search% )")
    Page<Board> findAllPickByTitle(Pageable pageable,
                                    @Param("authorId")Long authorId,
                                    @Param("search")String search,
                                    @Param("pick")String pick);

    Optional<Board> findById(Long id);
}
