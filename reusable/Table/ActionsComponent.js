import { useCallback } from "react";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const ActionsComponent = (props) => {
  const { count, page, rowsPerPage, onPageChange, actions } = props;
  const { setPageConfig, sort = 12, links } = actions;

  const theme = useTheme();

  const handleFirstPageButtonClick = useCallback(
    (event) => {
      setPageConfig({ page: 1 });
      onPageChange(event, 0);
    },
    [onPageChange, setPageConfig]
  );

  const handleBackButtonClick = useCallback(
    (event) => {
      let number = links.prev.match(/(\d+)/);
      let page = number[0];
      setPageConfig({ page });
      onPageChange(event, page - 1);
    },
    [links, onPageChange, setPageConfig]
  );

  const handleNextButtonClick = useCallback(
    (event) => {
      let number = links.next.match(/(\d+)/);
      let page = number[0];
      setPageConfig({ page });
      onPageChange(event, page + 1);
    },
    [links, onPageChange, setPageConfig]
  );

  const handleLastPageButtonClick = useCallback(
    (event) => {
      let number = links.last.match(/(\d+)/);
      let page = number[0];
      setPageConfig({ page });
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    },
    [links, onPageChange, setPageConfig]
  );

  return (
    <div className="flex-shrink-0 px-12 overflow-hidden">
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={links.first === null ? true : links.first === links.last}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={links.prev === null}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={links.next === null}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={links.last === null ? true : links.last === links.first}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
};

ActionsComponent.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default ActionsComponent;
