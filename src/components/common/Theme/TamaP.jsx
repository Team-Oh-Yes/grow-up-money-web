import { memo } from 'react';
function TamaP(props) {
  return (
    <div className="Maintitlecon">
      <p className="Maintitle">{props.n}</p>
      <p className="Maintitle">{props?.m}</p>
    </div>
  );
}
export default memo(TamaP);