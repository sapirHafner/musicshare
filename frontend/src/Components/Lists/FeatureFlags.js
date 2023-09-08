import { useState } from 'react';
import InputButton from '../InputButton'
import FeatureFlag from './Items/FeatureFlag';
const FeatureFlags = ({ featureFlags, onCreate, onDelete, onUpdate }) => {
  const [ featureFlagsState, setFeatureFlagsState ] = useState(featureFlags);

  const handleCreate = (name) => {
    try {
      setFeatureFlagsState([...featureFlagsState, {name, active:false}]);
      onCreate(name);
    } catch (error) {
      setFeatureFlagsState(featureFlagsState.filter(featureFlag => featureFlag.name !== name));
    }
  }

  const handleDelete = (name) => {
    try {
      setFeatureFlagsState(featureFlagsState.filter(featureFlag => featureFlag.name !== name));
      onDelete(name);
    } catch (error) {
      setFeatureFlagsState([...featureFlagsState, {name, active:false}]);
    }
  }

  return (
    <div>
      <br />
      <InputButton text={"Create feature flag"} onEnter={handleCreate} />
      <br />
      {featureFlagsState.map(featureFlag =>
        <FeatureFlag
          featureFlag={featureFlag}
          onUpdate={onUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default FeatureFlags