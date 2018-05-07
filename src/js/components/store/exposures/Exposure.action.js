export const EXPOSURE = {
  TYPE: 'EXPOSURE_TYPE',
  SELECT: 'EXPOSURE_SELECT',
  ADD: 'EXPOSURE_ADD',
  UPDATE: 'EXPOSURE_UPDATE',
};

export const selectNewExposure = exposure => ({
  type: EXPOSURE.TYPE,
  selectNewExposure: exposure,
});

export const viewExposure = exposure => ({
  type: EXPOSURE.SELECT,
  selectExposure: exposure,
});

export const addExposure = exposure => ({
  type: EXPOSURE.ADD,
  newExposure: exposure,
});

export const updateExposure = exposure => ({
  type: EXPOSURE.UPDATE,
  exposure,
});
