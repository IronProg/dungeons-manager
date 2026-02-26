import Toast from 'react-native-toast-message';
import humps from 'humps';
import i18n from 'i18n';

export interface ApiErrorDetail {
  type: string;
  attribute: string;
  params: Record<string, unknown>;
}

export interface ApiErrorResponse {
  type: string;
  params: Record<string, unknown>;
  details?: ApiErrorDetail[];
}

export const handleErrorMessage = (error?: ApiErrorResponse) => {
  if (!error) {
    networkError();

    return;
  }

  const { type, params, details } = error;

  if (type === 'auth_error' && params) {
    authError(params);

    return;
  }

  if (type === 'record_invalid' && details) {
    recordInvalidError(details);

    return;
  }

  unknownError(type, params);
};

const networkError = () => {
  Toast.show({
    type: 'error',
    text1: i18n.t('errors.general'),
    text2: i18n.t('errors.network_error'),
  });
};

const authError = (params: Record<string, unknown>) => {
  Toast.show({
    type: 'error',
    text1: i18n.t('errors.auth'),
    text2: i18n.t(
      `api.authError.${humps.camelize(`${params.message}`)}`,
      params,
    ),
  });
};

const unknownError = (type: string, params: Record<string, unknown>) => {
  const cleanParams = params
    ? (humps.camelizeKeys(params) as Record<string, unknown>)
    : {};

  Toast.show({
    type: 'error',
    text1: i18n.t('errors.general'),
    text2: i18n.t(`errors.${type}`, {
      ...cleanParams,
      defaultValue: i18n.t('errors.unknown'),
    }),
  });
};

const recordInvalidError = (details: ApiErrorDetail[]) => {
  details.forEach((err) => {
    const cleanParams = humps.camelizeKeys(err.params) as Record<
      string,
      unknown
    >;

    const attribute = i18n.t(
      `api.models.${cleanParams.model}.${cleanParams.attribute}`,
    );

    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: i18n.t(`api.errors.${err.type}`, {
        ...cleanParams,
        attribute: attribute,
        defaultValue: i18n.t(`api.errors.default_field_error`, {
          attribute: attribute,
        }),
      }),
    });
  });
};
