import React, {useCallback} from "react";
import useWindowDimensions from "../../../../libs/Hooks/useWindowDimensions";
import { Link } from "react-router-dom";
import '../../../../extensions/array.extension'

interface PageProps  {
    page: number,
    pageSize: number,
}

interface Props {
    page: PageProps,
    handlePage: (type: string) => (value: number) => void,
    pageInfo: {total: number}
}


const Pagination = ({ page, handlePage , pageInfo}: Props) => {
    const { width } = useWindowDimensions();

    const getPageNumberList = useCallback(
        (page: number, total: number , pageSize: number) => {

            const VIEW_PAGE_LIST_SIZE = 5;
            const MAX_PAGE_LIST_SIZE = total % pageSize === 0 ? Math.floor(Number(total / pageSize)) : Math.floor(Number(total / pageSize)) + 1;
            const pageListArray = [];

            if (VIEW_PAGE_LIST_SIZE < MAX_PAGE_LIST_SIZE)
                for (
                    let i =
                        page < 3 ? 1 :
                            MAX_PAGE_LIST_SIZE - (VIEW_PAGE_LIST_SIZE - 3) <= page ?
                                MAX_PAGE_LIST_SIZE - (VIEW_PAGE_LIST_SIZE - 1)
                                : page - 2;
                    page < 3
                        ? i <= VIEW_PAGE_LIST_SIZE
                        : MAX_PAGE_LIST_SIZE - (VIEW_PAGE_LIST_SIZE - 3) <= page
                            ? i <= MAX_PAGE_LIST_SIZE
                            : i <= page + 2;
                    i++
                ) {
                    pageListArray.push(i);
                }
            else
                for (
                    let i =
                        page < 3
                            ? 1
                            : MAX_PAGE_LIST_SIZE - (VIEW_PAGE_LIST_SIZE - 1) <= 0
                                ? 1
                                : MAX_PAGE_LIST_SIZE - (VIEW_PAGE_LIST_SIZE - 1) <= page
                                    ? MAX_PAGE_LIST_SIZE - (VIEW_PAGE_LIST_SIZE - 1)
                                    : page - 2;
                    i <= MAX_PAGE_LIST_SIZE;
                    i++
                ) {
                    pageListArray.push(i);
                }

            return pageListArray;
        },
        [page]
    );


    return (
        <div className="paging_box"
             style={width < 1155 ? { display: "none" } : {}}
        >
            <Link
                to="#"
                className="first"
                onClick={() => {
                    handlePage("page")(1);
                }}
                style={page.page === 1 ? { display: "none" } : {}}
            >
                <span className="sound_only">첫번째</span>
                <i className="icon paging_first"></i>
            </Link>
            <Link
                to="#"
                className="prev"
                onClick={() => {
                    handlePage("page")(page.page - 1);
                }}
                style={page.page === 1 ? { display: "none" } : {}}
            >
                <span className="sound_only">이전</span>
                <i className="icon paging_prev"></i>
            </Link>
            <div className="page_num">
                {getPageNumberList(page.page , pageInfo.total , page.pageSize)?.map((value: number, idx: number) => {
                    return (
                        <span className={page.page === value ? "num_sta current" : "num_sta"} key={idx}
                            onClick={() =>   handlePage("page")(Number(value))}
                        >
                            {value}
                        </span>
                    );
                })}
            </div>
            <Link
                to="#"
                className="next"
                onClick={() => handlePage("page")(page.page + 1)}
                style={(getPageNumberList(page.page , pageInfo.total , page.pageSize)?.length === 0) || (page.page === getPageNumberList(page.page , pageInfo.total , page.pageSize)?.last())  ? { display: "none" } : {}}
            >
                <span className="sound_only">다음</span>
                <i className="icon paging_next"></i>
            </Link>
            <Link to="#" className="last" style={(getPageNumberList(page.page , pageInfo.total , page.pageSize)?.length === 0) || (page.page === getPageNumberList(page.page , pageInfo.total , page.pageSize)?.last()) ? { display: "none" } : {}}
                  onClick={() => handlePage("page")(
                      pageInfo.total % page.pageSize === 0 ? Math.floor(Number(pageInfo.total/page.pageSize)) : Math.floor(Number(pageInfo.total/page.pageSize)) + 1
                  )}
            >
                <span className="sound_only">마지막</span>
                <i className="icon paging_last"></i>
            </Link>
        </div>
    );
};

export default Pagination;
