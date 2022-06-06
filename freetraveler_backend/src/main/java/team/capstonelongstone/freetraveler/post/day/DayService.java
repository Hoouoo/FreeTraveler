package team.capstonelongstone.freetraveler.post.day;

import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import team.capstonelongstone.freetraveler.post.PostService;
import team.capstonelongstone.freetraveler.post.board.Board;
import team.capstonelongstone.freetraveler.post.board.BoardRepository;
import team.capstonelongstone.freetraveler.post.img.ImgService;
import team.capstonelongstone.freetraveler.post.place.Place;
import team.capstonelongstone.freetraveler.post.place.PlaceRepository;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * @author 정순범, 박성호
 * Day, Place 저장
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class DayService {

    private final DayRepository dayRepository;
    private final PlaceRepository placeRepository;
    private final BoardRepository boardRepository;
    private final PostService postService;
    private final ImgService imgService;

    /**
     * Day, Place 생성 및 이미지 저장
     */
    public void generateDay(Long id, HttpServletRequest request, Board board) throws JSONException, IOException {

        Integer totalDays = Integer.valueOf(request.getParameter("totalDays"));
        for (int day = 0; day < totalDays; day++) {
            String varPlength = day + "_plength";

            Integer _plength = Integer.valueOf(request.getParameter(varPlength));
            Day newDay = Day.builder().day(day + 1).board(board).build();
            // 보드 Id와 day(일수)를 통해 보드 id와 몇 일인지 가지는 Day(객체) Entity를 추출
            Day targetDay = dayRepository.findByBoardIdAndDay(id, day + 1).orElse(null);
            // 추출한 객체 Day의 Day Id를 사용
            if (Objects.isNull(targetDay)) {
                dayRepository.save(newDay);
            }
            for (int j = 0; j < _plength; j++) {
                String varImg = day + "_" + j + "_" + "img";

                MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
                MultipartFile file = multipartRequest.getFile(varImg);
                List<String> list = new ArrayList<>();
                if (file != null && !file.isEmpty()) {
                    list = imgService.daySaveImg(request, file, day, j);
                }

                List<Double> latLng = postService.getLatLng(request.getParameter(day + "_" + j + "_" + "loc"));

                /**
                 * 수정 부분
                 */
                if (Objects.nonNull(id)) {
                    Board targetBoard = boardRepository.findById(id).orElse(null);
                    if (Objects.nonNull(targetBoard)) {
                        if (Objects.nonNull(targetDay)) {
                            // 이미지 변경이 없는 경우
                            List<Long> listPlaceId = placeRepository.listPlaceIdByDay(targetDay.getId());
                            if(Objects.isNull(file)) {
                                list = imgService.dayModifyImg(listPlaceId.get(j), request, day, j);
                            }
                            try {
                                Place place = Place.builder().id(listPlaceId.get(j)).day(targetDay).name(request.getParameter(day + "_" + j + "_" + "name"))
                                        .address(request.getParameter(day + "_" + j + "_" + "loc")).cost(Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost")))
                                        .review(request.getParameter(day + "_" + j + "_" + "content")).transportation(request.getParameter(day + "_" + j + "_" + "trans"))
                                        .lat(latLng.get(0)).lng(latLng.get(1)).placeImgPath(list.get(0)).placeImgName(list.get(1)).build();
                                placeRepository.save(place);
                            }catch(Exception e){
                                log.info(e.getMessage());
                                Place place = Place.builder().day(targetDay).name(request.getParameter(day + "_" + j + "_" + "name"))
                                        .address(request.getParameter(day + "_" + j + "_" + "loc")).cost(Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost")))
                                        .review(request.getParameter(day + "_" + j + "_" + "content")).transportation(request.getParameter(day + "_" + j + "_" + "trans"))
                                        .lat(latLng.get(0)).lng(latLng.get(1)).placeImgPath(list.get(0)).placeImgName(list.get(1)).build();
                                placeRepository.save(place);
                            }
                        }
                        // 수정인데 추가인 경우
                        else {
                            Place place = Place.builder().day(newDay).name(request.getParameter(day + "_" + j + "_" + "name"))
                                    .address(request.getParameter(day + "_" + j + "_" + "loc")).cost(Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost")))
                                    .review(request.getParameter(day + "_" + j + "_" + "content")).transportation(request.getParameter(day + "_" + j + "_" + "trans"))
                                    .lat(latLng.get(0)).lng(latLng.get(1)).placeImgPath(list.get(0)).placeImgName(list.get(1)).build();
                            placeRepository.save(place);
                        }
                    }
                    // Day를 삭제해서 요청한 경우 day 테이블의 일수와 요청들어온 일수를 비교하기 위해 사용
                    List<Day> targetDiffDay = dayRepository.findAllByBoardId(id);
                    if (!targetDiffDay.isEmpty()) {
                        for (Day target : targetDiffDay) {
                            if (totalDays < target.getDay()) {
                                deleteDay(target.getId());
                            }
                            // place 삭제
                            List<Place> targetPlace = placeRepository.listPlaceByDayIdAndDay(target.getId(), target.getDay());
                            if(!targetPlace.isEmpty()){
                                System.out.println("준비됐나요 : listsize" + targetPlace.size());
                                System.out.println("준비됐나요 : _plength" + _plength);
                                for(int deletePlaceIdx = targetPlace.size()-1; deletePlaceIdx >= _plength; deletePlaceIdx--){
                                    System.out.println("준비됐어요");
                                    deletePlace(targetPlace.get(deletePlaceIdx).getId());
                                }
                            }
                        }
                    }
                } else {
                    Place place = Place.builder().day(newDay).name(request.getParameter(day + "_" + j + "_" + "name"))
                            .address(request.getParameter(day + "_" + j + "_" + "loc")).cost(Integer.valueOf(request.getParameter(day + "_" + j + "_" + "cost")))
                            .review(request.getParameter(day + "_" + j + "_" + "content")).transportation(request.getParameter(day + "_" + j + "_" + "trans"))
                            .lat(latLng.get(0)).lng(latLng.get(1)).placeImgPath(list.get(0)).placeImgName(list.get(1)).build();
                    placeRepository.save(place);
                }

            }
        }
    }

    public Long saveDay(Day day) {
        return dayRepository.save(day).getId();
    }

    public void deleteDay(Long dayId) {
        dayRepository.findById(dayId).ifPresent(dayRepository::delete);
    }

    public void deletePlace(Long placeId){
        placeRepository.findById(placeId).ifPresent(placeRepository::delete);
    }


}
