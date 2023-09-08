import { useState } from 'react';
import InputButton from './InputButton'
import Button from './Buttons/Button';

const FeatureFlags = ({ featureFlags, onCreate, onEdit, onDelete }) => {
  const [ featureFlagsState, setFeatureFlagsState ] = useState(featureFlags);

  const handleCreate = (name) => {
    try {
      setFeatureFlagsState([...featureFlagsState, {name, active:false}]);
      onCreate(name);
    } catch (error) {
      setFeatureFlagsState(featureFlagsState.filter(featureFlag => featureFlag.name !== name));
    }
  }

  const handleDelete = (event) => {
    const name = event.target.id;
    try {
      console.log(featureFlagsState.filter(featureFlag => featureFlag.name !== name))
      setFeatureFlagsState(featureFlagsState.filter(featureFlag => featureFlag.name !== name));
      onDelete(name);
    } catch (error) {
      setFeatureFlagsState([...featureFlagsState, {name, active:false}]);
    }
  }

  return (
    <div>
      <InputButton text={"Create feature flag"} onEnter={handleCreate} />
      {featureFlagsState.map(featureFlag =>
      <div>
        {featureFlag.name}
        <Button id={featureFlag.name} text={"Delete"} onClick={handleDelete} />
      </div>
      )}
    </div>
  )
}

export default FeatureFlags