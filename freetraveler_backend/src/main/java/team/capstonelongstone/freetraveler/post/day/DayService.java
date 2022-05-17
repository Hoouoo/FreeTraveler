package team.capstonelongstone.freetraveler.post.day;

import lombok.RequiredArgsConstructor;

import org.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import team.capstonelongstone.freetraveler.post.PostService;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.img.ImgService;
import team.capstonelongstone.freetraveler.post.place.Place;
import team.capstonelongstone.freetraveler.post.place.PlaceRepository;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DayService {

    private final DayRepository dayRepository;
    private final PlaceRepository placeRepository;
    private final PostService postService;
    private final ImgService imgService;

    /**
     * Day, Place 생성 및 이미지 저장
     */
    public void generateDay(HttpServletRequest request, Board board) throws JSONException, IOException {

        Integer totalDays = Integer.valueOf(request.getParameter("totalDays"));

        for (int day=0;day<totalDays;day++){
            String varPlength=day + "_plength";
            Integer _plength = Integer.valueOf(request.getParameter(varPlength));
            Day newDay=Day.builder().day(day+1).board(board).build();
            dayRepository.save(newDay);
            for(int j=0;j<_plength;j++) {
                String varImg=day + "_" + j + "_" + "img";

                MultipartHttpServletRequest multipartRequest= (MultipartHttpServletRequest) request;
                MultipartFile file=multipartRequest.getFile(varImg);

                String placeTargetImg = imgService.daySaveImg(request, file,day,j);
                List<Double> latLng = postService.getLatLng(request.getParameter(day + "_" + j + "_" + "loc"));

                Place place=Place.builder().board(board).day(newDay).name(request.getParameter(day + "_" + j + "_" + "name"))
                        .address(request.getParameter(day + "_" + j + "_" + "loc")).cost(Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost")))
                        .review(request.getParameter(day + "_" + j + "_" + "content")).transportation(request.getParameter(day + "_" + j + "_" + "trans"))
                        .lat(latLng.get(0)).lng(latLng.get(1)).placeImage(placeTargetImg).build();
                placeRepository.save(place);
            }

        }
    }

    public Long saveDay(Day day){
        return dayRepository.save(day).getId();
    }


}
