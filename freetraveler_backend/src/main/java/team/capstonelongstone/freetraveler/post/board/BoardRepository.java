package team.capstonelongstone.freetraveler.post.board;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import team.capstonelongstone.freetraveler.good.domain.Good;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long>{

    @Query("select b from Board as b where b.id=:boardId")
    Board findByBoardId(@Param("boardId")Long boardId);

    //pick이 all일 때
    @Query("select b from Board as b where b.author.userId like %:search%")
    Page<Board> findAllPickAllByAuthor(Pageable pageable,
                               @Param("search")String search);

    @Query("select b from Board as b where b.postName like %:search%")
    Page<Board> findAllPickAllByTitle(Pageable pageable,
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

    @Query("SELECT b FROM Board AS b ORDER BY rand()")
    Page<Board> findAllPickByRand(Pageable pageable);


    @Modifying
    @Transactional
    @Query("update Board as b set b.goodCnt=:goodCnt where b.id=:id")
    void updateGoodCnt(@Param("goodCnt")Integer goodCnt,
                        @Param("id")Long id);

    @Query("select b from Board as b where b.author.id=:id")
    Page<Board> findAllIsMine(Pageable pageableMine,
                              @Param("id")Long id);

}
