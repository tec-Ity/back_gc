import { useHistory } from "react-router";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";

import Query from "../../../components/universal/query/Query";

import { selectObjects } from "../../../features/objectsSlice";

import { getRolePath } from "../../../js/conf/confUser";
import NavBread from "../../../components/universal/navBread/NavBread";

import UiCards from "../../../components/ui/UiCards";
import PdCard from "../../../components/ui/pd/PdCard";
import PdRow from "../../../components/ui/pd/PdRow";

export default function Pds(props) {
  const flagSlice = "pds";
  const api = "/Pds";
  const rolePath = getRolePath();
  const hist = useHistory();

  const objects = useSelector(selectObjects(flagSlice));
  const clickEvent = (obj) => (e) => {
    hist.push(`/${rolePath}/pd/${obj._id}`);
  };

  return (
    <>
      <NavBread
        activePage={
          <FormattedMessage id='navLabel-pds' defaultMessage='Products' />
        }></NavBread>

      <Query api={api} flagSlice={flagSlice} />

      <div className='mt-4'>
        <UiCards
          propsCard={PdCard}
          UiRow={PdRow}
          objects={objects}
          clickEvent={clickEvent}
        />
      </div>
    </>
  );
}
