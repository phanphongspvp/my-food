import Location from "~/components/Location";
import Endow from "~/components/Endow";
import Collection from "~/components/Collection";

function ContentMainLayout({ contents, categorys, to }) {
  return (
    <>
      {/* Location */}
      <Location />

      {/* Content */}
      <Endow contents={contents} to={to} />

      {/* Category */}
      <Collection categorys={categorys} />
    </>
  );
}

export default ContentMainLayout;
