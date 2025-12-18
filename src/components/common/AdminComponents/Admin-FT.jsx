import React, { useState, useCallback, useMemo, useEffect } from 'react';
import '../../css/Admincss/Admin-FT.css';
import searchIcon from '../../../img/searchIcon.svg';
import AdminFTHistory from './Admin-FT-history';
import AdminFTCollections from './Admin-FT-collections';
import axiosInstance from '../../api/axiosInstance';

// 페이지네이션 상수
const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 10;

// 상태 스타일 매핑
const STATUS_STYLES = {
    '미발급': 'status-unissued',
    '발급 - 판매중': 'status-selling',
    '발급 - 소유중': 'status-owned'
};

// 검색바 컴포넌트
const SearchBar = ({ value, onChange }) => (
    <div className="search-bar ft-search-bar-custom">
        <div>
            <img src={searchIcon} alt="검색" />
        </div>
        <input
            placeholder="검색어를 입력해주세요."
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

// FT 행 컴포넌트
const FTRow = React.memo(({ ft, onViewHistory, onIssue }) => {
    return (
        <tr>
            <td>{ft.name}</td>
            <td>{ft.owner}</td>
            <td className={ft.issueDate === '발급되지 않음' ? 'text-red' : ''}>
                {ft.issueDate}
            </td>
            <td>
                <button
                    className={`btn-history ${ft.history.length === 0 ? 'disabled' : ''}`}
                    onClick={() => onViewHistory(ft.history)}
                    disabled={ft.history.length === 0}
                >
                    소유자 히스토리 보기
                </button>
            </td>
            <td>
                <span className={`status-badge ${STATUS_STYLES[ft.status]}`}>
                    {ft.status}
                </span>
            </td>
            <td>
                <button
                    className={`btn-issue ${ft.status !== '미발급' ? 'disabled' : ''}`}
                    onClick={() => onIssue(ft.id)}
                    disabled={ft.status !== '미발급'}
                >
                    NFT 발급하기
                </button>
            </td>
        </tr>
    );
});

// 빈 상태 컴포넌트
const EmptyState = () => (
    <tr>
        <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
            검색 결과가 없습니다
        </td>
    </tr>
);

// 로딩 상태 컴포넌트
const LoadingState = () => (
    <tr>
        <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            로딩 중...
        </td>
    </tr>
);

// 메인 컴포넌트
export default function FtManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [fts, setFts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pagination, setPagination] = useState({
        currentPage: DEFAULT_PAGE,
        totalPages: 0,
        totalElements: 0,
        size: DEFAULT_SIZE,
        isFirst: true,
        isLast: true
    });

    // 팝업 상태
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [isIssuePopupOpen, setIsIssuePopupOpen] = useState(false);

    // FT 목록 가져오기
    const getFTList = async (page = DEFAULT_PAGE, size = DEFAULT_SIZE) => {
        try {
            setIsLoading(true);
            const res = await axiosInstance.get("/nft/collections", {
                params: { page, size }
            });

            const data = res.data;
            console.log('API Response - FT data:', data);

            // 응답이 배열인지 객체인지 확인
            let ftList = [];
            
            if (Array.isArray(data)) {
                // 응답이 직접 배열인 경우
                ftList = data;
            } else if (data.content && Array.isArray(data.content)) {
                // 응답이 페이지네이션 객체인 경우
                ftList = data.content;
            } else {
                console.warn('예상치 못한 API 응답 구조:', data);
                ftList = [];
            }

            const mappedFTs = ftList.map(ft => ({
                id: ft.id,
                name: ft.name || '-',
                owner: ft.owner || '-',
                issueDate: ft.issueDate || '발급되지 않음',
                status: ft.status || '미발급',
                history: ft.history || []
            }));

            setFts(mappedFTs);
            
            // 페이지네이션 정보 설정
            if (data.content) {
                setPagination({
                    currentPage: data.number || 0,
                    totalPages: data.totalPages || 0,
                    totalElements: data.numberOfElements || 0,
                    size: data.size || DEFAULT_SIZE,
                    isFirst: data.first !== undefined ? data.first : true,
                    isLast: data.last !== undefined ? data.last : true
                });
            }
        } catch (error) {
            console.error("FT 목록을 불러오는데 실패했습니다", error);
            console.error("에러 상세:", error.response?.data);
            setFts([]);
        } finally {
            setIsLoading(false);
        }
    };

    // 컴포넌트 마운트 시 FT 목록 로드
    useEffect(() => {
        getFTList();
    }, []);

    // 필터링된 FT 목록
    const filteredFTs = useMemo(() => {
        if (!searchTerm.trim()) return fts;
        return fts.filter(ft =>
            ft.name.includes(searchTerm) ||
            ft.owner.includes(searchTerm)
        );
    }, [fts, searchTerm]);

    // 히스토리 보기 핸들러
    const handleViewHistory = useCallback((history) => {
        if (history.length > 0) {
            setSelectedHistory(history);
        }
    }, []);

    // NFT 발급 핸들러
    const handleIssue = useCallback((id) => {
        alert(`NFT (ID: ${id}) 발급 기능은 준비중입니다.`);
    }, []);

    // 발급 팝업 성공 핸들러
    const handleIssueSuccess = useCallback(() => {
        console.log('NFT 발급 완료');
        getFTList(); // 목록 새로고침
    }, []);

    return (
        <div>
            <div className="ft-top-controls">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
                <button
                    className="btn-create-ft"
                    onClick={() => setIsIssuePopupOpen(true)}
                >
                    FT 발급하기
                </button>
            </div>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>NFT명</th>
                        <th>소유자(ID)</th>
                        <th>발급일</th>
                        <th>소유자 히스토리</th>
                        <th>상태</th>
                        <th>NFT 발급하기</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <LoadingState />
                    ) : filteredFTs.length > 0 ? (
                        filteredFTs.map(ft => (
                            <FTRow
                                key={ft.id}
                                ft={ft}
                                onViewHistory={handleViewHistory}
                                onIssue={handleIssue}
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </tbody>
            </table>

            {/* 히스토리 팝업 */}
            {selectedHistory && (
                <AdminFTHistory
                    history={selectedHistory}
                    onClose={() => setSelectedHistory(null)}
                />
            )}

            {/* 발급 팝업 */}
            {isIssuePopupOpen && (
                <AdminFTCollections
                    onClose={() => setIsIssuePopupOpen(false)}
                    onSuccess={handleIssueSuccess}
                />
            )}
        </div>
    );
}