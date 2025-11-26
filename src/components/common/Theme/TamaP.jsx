import { memo } from 'react';
function TamaP(props) {
  return (
    <div className="Maintitlecon">
      <p className="Maintitle">{props.n}</p>
    </div>
  );
}
export default memo(TamaP);