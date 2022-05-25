package team.capstonelongstone.freetraveler.post.board.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostListDTO {

    Integer page;
    Integer pageSize;
    String sort;
    String orderBy;
    String search;
    String method;
    String isMyPic;

    @Builder
    public PostListDTO(Integer page, Integer pageSize, String sort, String orderBy, String search, String method, String isMyPic) {
        this.page = page;
        this.pageSize = pageSize;
        this.sort = sort;
        this.orderBy = orderBy;
        this.search = search;
        this.method = method;
        this.isMyPic = isMyPic;
    }

}
