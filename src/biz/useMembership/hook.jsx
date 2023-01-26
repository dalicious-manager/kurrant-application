import {useAtom} from 'jotai';

import * as Fetch from './Fetch';
import {
  isMembershipProductAtom,
  isMembershipJoinAtom,
isMembershipTerminateAtom,
isMembershipHistoryAtom,
} from './store';

const useBanner = () => {
  const [isMembershipProductLoading, setMembershipProductLoading] = useAtom(isMembershipProductAtom);
  const [isMembershipJoinLoading, setMembershipJoinLoading] = useAtom(isMembershipJoinAtom);
  const [isMembershipTerminateLoading, setMembershipTerminateLoading] = useAtom(isMembershipTerminateAtom);
  const [isMembershipHistoryLoading, setMembershipHistoryLoading] = useAtom(isMembershipHistoryAtom);
  const [isMembershipTypeLoading, setMembershipTypeLoading] = useAtom(isMembershipHistoryAtom);

  const getMembershipProduct = async (option = {}) => {
    try {
      setMembershipProductLoading(true);
      const fetchRes = await Fetch.getMembershipProduct(option);
      return fetchRes;
    } catch (err) {
      throw err;
    } finally {
      setMembershipProductLoading(false);
    }
  };
  const membershipJoin = async (body,option = {}) => {
    try {
      setMembershipJoinLoading(true);
      const fetchRes = await Fetch.membershipJoin(
        {
          ...body
        }
        ,option
        );
      return fetchRes;
    } catch (err) {
      throw err;
    } finally {
      setMembershipJoinLoading(false);
    }
  };
  const membershipTerminate = async (option = {}) => {
    try {
      setMembershipTerminateLoading(true);
      const fetchRes = await Fetch.membershipTerminate(option);
      return fetchRes;
    } catch (err) {
      throw err;
    } finally {
      setMembershipTerminateLoading(false);
    }
  };
  const getMembershipHistory = async (option = {}) => {
    try {
      setMembershipHistoryLoading(true);
      const fetchRes = await Fetch.getMembershipHistory(option);
      return fetchRes;
    } catch (err) {
      throw err;
    } finally {
      setMembershipHistoryLoading(false);
    }
  };
  const getMembershipType = async (type,option = {}) => {
    try {
      setMembershipTypeLoading(true);
      const fetchRes = await Fetch.getMembershipType(type,option);
      return fetchRes;
    } catch (err) {
      throw err;
    } finally {
      setMembershipTypeLoading(false);
    }
  };

  return {
    getMembershipProduct,
    membershipJoin,
    membershipTerminate,
    getMembershipHistory,
    getMembershipType,
    readableAtom: {
      isMembershipProductLoading,
      isMembershipJoinLoading,
      isMembershipTerminateLoading,
      isMembershipHistoryLoading,
      isMembershipTypeLoading,
    },
  };
};

export default useBanner;
