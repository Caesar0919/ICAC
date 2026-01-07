"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Settings,
  Shield,
  BarChart3,
  Calendar
} from "lucide-react"
import { addWeeks, addMonths, startOfWeek, format, differenceInWeeks, differenceInDays, parseISO, getWeek, startOfMonth } from "date-fns"

interface ChecklistItem {
  id: string
  category: string
  item: string
  description: string
  checked: boolean
}

interface ActionItem {
  id: string
  area: string
  action: string
  description: string
  priority: "high" | "medium" | "low"
  timeline: string
}

interface GanttItem {
  id: string
  area: string
  action: string
  startDate: Date
  endDate: Date
  priority: "high" | "medium" | "low"
  timeline: string
}

export default function Home() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "1",
      category: "정책 및 절차",
      item: "내부거래 정의 및 범위 명확화",
      description: "그룹 내부거래의 정의 및 적용 범위 명확히 정의",
      checked: false
    },
    {
      id: "2",
      category: "정책 및 절차",
      item: "거래통화 기준 관리 원칙 수립",
      description: "모든 내부거래는 거래통화(Transaction Currency) 기준으로 관리하는 원칙 수립",
      checked: false
    },
    {
      id: "3",
      category: "정책 및 절차",
      item: "수익/비용 인식 시점 일원화",
      description: "법인 간 수익/비용 인식 시점 일원화 원칙 수립 (특히 해외자회사 거래시)",
      checked: false
    },
    {
      id: "4",
      category: "정책 및 절차",
      item: "해외자회사 환율 적용 기준",
      description: "해외자회사 거래시 환율 적용 기준 및 통화 변환 원칙 수립",
      checked: false
    },
    {
      id: "5",
      category: "정책 및 절차",
      item: "거래 유형별 처리 기준 정의",
      description: "제품/서비스/금융/공통비 등 거래 유형별 처리 기준 및 회계 처리 방법 정의",
      checked: false
    },
    {
      id: "6",
      category: "정책 및 절차",
      item: "내부거래 식별 및 분류 기준",
      description: "내부거래를 일반 거래와 구분하는 명확한 식별 기준 및 분류 체계 수립",
      checked: false
    },
    {
      id: "7",
      category: "정책 및 절차",
      item: "내부거래 등록 및 문서화 요건",
      description: "내부거래 등록 시 필수 정보 및 증빙 문서 요건 명확화",
      checked: false
    },
    {
      id: "8",
      category: "정책 및 절차",
      item: "내부거래 대사 원칙 수립",
      description: "법인 간 내부거래 대사 주기, 방법 및 기준 통일",
      checked: false
    },
    {
      id: "9",
      category: "정책 및 절차",
      item: "미대사 항목 처리 원칙",
      description: "미대사 항목 발견 시 처리 절차 및 책임자 지정",
      checked: false
    },
    {
      id: "10",
      category: "정책 및 절차",
      item: "내부거래 회계 처리 기준",
      description: "내부매출/내부매입 계정 사용 기준 및 회계 처리 방법 통일",
      checked: false
    },
    {
      id: "11",
      category: "정책 및 절차",
      item: "연결제거 원칙 및 프로세스",
      description: "연결재무제표 작성을 위한 내부거래 제거 원칙 및 프로세스 정의",
      checked: false
    },
    {
      id: "12",
      category: "정책 및 절차",
      item: "해외자회사 특별 규정",
      description: "해외자회사 거래시 현지 회계 기준과 그룹 기준 차이 조정 원칙",
      checked: false
    },
    {
      id: "13",
      category: "시스템 업그레이드",
      item: "내부거래 관리 시스템 기능 강화",
      description: "기존 내부거래 관리 시스템에 정책 반영 및 기능 업그레이드",
      checked: false
    },
    {
      id: "14",
      category: "시스템 업그레이드",
      item: "내부거래 대사 자동화 고도화",
      description: "기존 대사 시스템의 자동화 수준 향상 및 오류율 감소",
      checked: false
    },
    {
      id: "15",
      category: "시스템 업그레이드",
      item: "수익/비용 인식 시점 검증 기능",
      description: "법인 간 수익/비용 인식 시점 일치 여부 자동 검증 기능 추가",
      checked: false
    },
    {
      id: "16",
      category: "시스템 업그레이드",
      item: "해외자회사 환율 적용 기능 강화",
      description: "해외자회사 거래시 환율 적용 및 환율차이 관리 기능 개선",
      checked: false
    },
    {
      id: "17",
      category: "시스템 업그레이드",
      item: "미대사 항목 자동 추적 시스템",
      description: "미대사 항목 자동 탐지 및 추적 기능 추가",
      checked: false
    },
    {
      id: "21",
      category: "운영 관리",
      item: "내부거래 등록 프로세스 운영",
      description: "내부거래 발생 시 즉시 등록 및 검증 프로세스 운영",
      checked: false
    },
    {
      id: "22",
      category: "운영 관리",
      item: "내부거래 등록 검증 체계",
      description: "등록된 내부거래의 정확성 및 완전성 검증 체계 구축",
      checked: false
    },
    {
      id: "23",
      category: "운영 관리",
      item: "월별 정기 대사 수행",
      description: "매월 말일 기준 내부거래 대사 정기 수행 및 결과 확인",
      checked: false
    },
    {
      id: "24",
      category: "운영 관리",
      item: "분기별 상세 대사 수행",
      description: "분기별 상세 대사 및 미대사 항목 분석 보고",
      checked: false
    },
    {
      id: "25",
      category: "운영 관리",
      item: "미대사 항목 추적 시스템",
      description: "미대사 항목 자동 추적 및 현황 모니터링 시스템 운영",
      checked: false
    },
    {
      id: "26",
      category: "운영 관리",
      item: "미대사 항목 해소 프로세스",
      description: "미대사 항목 발견 시 즉시 해소 프로세스 및 책임자 지정",
      checked: false
    },
    {
      id: "27",
      category: "운영 관리",
      item: "내부거래 정산 일정 관리",
      description: "내부거래 정산 일정 수립 및 준수 관리 체계",
      checked: false
    },
    {
      id: "29",
      category: "운영 관리",
      item: "내부거래 정산 방법 정의",
      description: "정산 주기, 방법(계좌이체/상계 등) 및 절차 정의",
      checked: false
    },
    {
      id: "30",
      category: "운영 관리",
      item: "해외자회사 대사 특별 프로세스",
      description: "해외자회사 거래시 환율 적용, 시차 등 고려한 대사 프로세스",
      checked: false
    },
    {
      id: "33",
      category: "회계 처리",
      item: "내부거래 분개 기준 수립",
      description: "내부거래 회계 분개 작성 기준 및 방법 수립",
      checked: false
    },
    {
      id: "34",
      category: "회계 처리",
      item: "환율 적용 회계 처리 기준",
      description: "해외자회사 거래시 환율 적용 및 환율차이 회계 처리 기준",
      checked: false
    },
    {
      id: "35",
      category: "회계 처리",
      item: "내부거래 회계 처리 일원화",
      description: "법인 간 내부거래 회계 처리 방법 일원화",
      checked: false
    },
    {
      id: "36",
      category: "회계 처리",
      item: "연결제거 대상 식별",
      description: "연결재무제표 작성시 제거 대상 내부거래 식별 기준 및 방법",
      checked: false
    },
    {
      id: "37",
      category: "회계 처리",
      item: "연결제거 분개 작성",
      description: "연결제거 분개 작성 기준 및 프로세스 수립",
      checked: false
    },
    {
      id: "38",
      category: "회계 처리",
      item: "미실현 손익 제거",
      description: "재고에 포함된 내부거래 미실현 손익 제거 기준 및 방법",
      checked: false
    },
    {
      id: "39",
      category: "회계 처리",
      item: "내부거래 잔액 검증",
      description: "월말/분기말 내부거래 계정 잔액 검증 프로세스",
      checked: false
    },
    {
      id: "45",
      category: "리스크 관리",
      item: "내부거래 가격 검증 프로세스",
      description: "내부거래 가격이 시장 가격과 일치하는지 정기 검증",
      checked: false
    },
    {
      id: "46",
      category: "리스크 관리",
      item: "공정거래법 준수 체크리스트",
      description: "공정거래법 위반 가능성 점검을 위한 체크리스트 운영",
      checked: false
    },
    {
      id: "47",
      category: "리스크 관리",
      item: "내부거래 규모 모니터링",
      description: "내부거래 규모 및 비중 모니터링으로 리스크 사전 파악",
      checked: false
    },
    {
      id: "48",
      category: "리스크 관리",
      item: "내부거래 리스크 평가",
      description: "정기적인 내부거래 리스크 평가 및 대응 방안 수립",
      checked: false
    },
    {
      id: "49",
      category: "리스크 관리",
      item: "내부거래 감사 대응 체계",
      description: "외부 감사 및 세무조사 대응을 위한 내부거래 자료 관리",
      checked: false
    },
    {
      id: "50",
      category: "보고 및 모니터링",
      item: "월간 내부거래 현황 보고",
      description: "경영진/관리자 대상 월간 내부거래 현황 보고 체계",
      checked: false
    },
    {
      id: "51",
      category: "보고 및 모니터링",
      item: "분기별 내부거래 분석 보고",
      description: "경영진 대상 분기별 내부거래 분석 및 트렌드 보고",
      checked: false
    },
    {
      id: "52",
      category: "보고 및 모니터링",
      item: "연간 내부거래 종합 보고",
      description: "이사회 대상 연간 내부거래 종합 보고서 작성",
      checked: false
    },
    {
      id: "53",
      category: "보고 및 모니터링",
      item: "내부거래 KPI 설정",
      description: "대사 일치율, 미대사 해소율 등 핵심 KPI 지표 설정",
      checked: false
    },
    {
      id: "54",
      category: "보고 및 모니터링",
      item: "KPI 추적 및 모니터링",
      description: "설정된 KPI 정기 추적 및 목표 대비 달성도 모니터링",
      checked: false
    },
    {
      id: "55",
      category: "보고 및 모니터링",
      item: "내부거래 대시보드 구축",
      description: "내부거래 현황을 한눈에 볼 수 있는 실시간 대시보드 구축",
      checked: false
    },
    {
      id: "56",
      category: "보고 및 모니터링",
      item: "이상 징후 보고 체계",
      description: "이상 거래 또는 리스크 발견 시 즉시 보고 체계 구축",
      checked: false
    },
    {
      id: "57",
      category: "SAP IC 계정 도입",
      item: "IC 파트너 마스터 데이터 구축 완료",
      description: "모든 계열사를 IC 파트너로 등록",
      checked: false
    },
    {
      id: "58",
      category: "SAP IC 계정 도입",
      item: "IC 계정 체계 정의 및 설정 완료",
      description: "내부매출/매입/채권/채무 계정 설정",
      checked: false
    },
    {
      id: "59",
      category: "SAP IC 계정 도입",
      item: "IC 거래 유형 설정 완료",
      description: "IC 전용 거래 유형 생성 및 자동 계정 할당 설정",
      checked: false
    },
    {
      id: "60",
      category: "SAP IC 계정 도입",
      item: "IC 파트너 필드 필수 입력 설정",
      description: "IC 계정 사용 시 IC 파트너 필수 입력으로 설정",
      checked: false
    },
    {
      id: "61",
      category: "SAP IC 계정 도입",
      item: "IC 대사 리포트 테스트 완료",
      description: "표준 리포트 확인 및 커스텀 리포트 필요 시 개발",
      checked: false
    },
    {
      id: "62",
      category: "SAP IC 계정 도입",
      item: "연결제거 규칙 설정 완료",
      description: "Group Reporting 사용 시 IC 제거 자동화 규칙 설정",
      checked: false
    },
    {
      id: "63",
      category: "SAP IC 계정 도입",
      item: "사용자 교육 완료",
      description: "재무팀, 회계팀 대상 IC 계정 사용법 교육",
      checked: false
    },
    {
      id: "64",
      category: "SAP IC 계정 도입",
      item: "파일럿 테스트 완료",
      description: "일부 법인/거래로 시범 운영 후 전면 적용",
      checked: false
    }
  ])

  const actionItems: ActionItem[] = [
    {
      id: "1",
      area: "정책 및 절차",
      action: "내부거래 정의 및 범위 명확화",
      description: "그룹 내부거래의 정의 및 적용 범위 명확히 정의",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "2",
      area: "정책 및 절차",
      action: "거래통화 기준 관리 원칙 수립",
      description: "모든 내부거래는 거래통화(Transaction Currency) 기준으로 관리하는 원칙 수립",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "3",
      area: "정책 및 절차",
      action: "수익/비용 인식 시점 일원화 원칙 수립",
      description: "법인 간 수익/비용 인식 시점 일원화 원칙 수립 (특히 해외자회사 거래시)",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "4",
      area: "정책 및 절차",
      action: "해외자회사 환율 적용 기준 수립",
      description: "해외자회사 거래시 환율 적용 기준 및 통화 변환 원칙 수립",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "5",
      area: "정책 및 절차",
      action: "거래 유형별 처리 기준 정의",
      description: "제품/서비스/금융/공통비 등 거래 유형별 처리 기준 및 회계 처리 방법 정의",
      priority: "medium",
      timeline: "2주"
    },
    {
      id: "6",
      area: "정책 및 절차",
      action: "내부거래 식별 및 분류 기준 수립",
      description: "내부거래를 일반 거래와 구분하는 명확한 식별 기준 및 분류 체계 수립",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "7",
      area: "정책 및 절차",
      action: "내부거래 등록 및 문서화 요건 정의",
      description: "내부거래 등록 시 필수 정보 및 증빙 문서 요건 명확화",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "8",
      area: "정책 및 절차",
      action: "내부거래 대사 원칙 수립",
      description: "법인 간 내부거래 대사 주기, 방법 및 기준 통일",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "9",
      area: "정책 및 절차",
      action: "미대사 항목 처리 원칙 수립",
      description: "미대사 항목 발견 시 처리 절차 및 책임자 지정",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "10",
      area: "정책 및 절차",
      action: "내부거래 회계 처리 기준 수립",
      description: "내부매출/내부매입 계정 사용 기준 및 회계 처리 방법 통일",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "11",
      area: "정책 및 절차",
      action: "연결제거 원칙 및 프로세스 수립",
      description: "연결재무제표 작성을 위한 내부거래 제거 원칙 및 프로세스 정의",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "12",
      area: "정책 및 절차",
      action: "해외자회사 특별 규정 수립",
      description: "해외자회사 거래시 현지 회계 기준과 그룹 기준 차이 조정 원칙",
      priority: "medium",
      timeline: "2주"
    },
    {
      id: "13",
      area: "시스템 업그레이드",
      action: "내부거래 관리 시스템 기능 강화",
      description: "기존 내부거래 관리 시스템에 정책 반영 및 기능 업그레이드",
      priority: "high",
      timeline: "2-3개월"
    },
    {
      id: "14",
      area: "시스템 업그레이드",
      action: "내부거래 대사 자동화 고도화",
      description: "기존 대사 시스템의 자동화 수준 향상 및 오류율 감소",
      priority: "high",
      timeline: "2-3개월"
    },
    {
      id: "15",
      area: "시스템 업그레이드",
      action: "수익/비용 인식 시점 검증 기능 추가",
      description: "법인 간 수익/비용 인식 시점 일치 여부 자동 검증 기능 추가",
      priority: "medium",
      timeline: "1-2개월"
    },
    {
      id: "16",
      area: "시스템 업그레이드",
      action: "해외자회사 환율 적용 기능 강화",
      description: "해외자회사 거래시 환율 적용 및 환율차이 관리 기능 개선",
      priority: "high",
      timeline: "1-2개월"
    },
    {
      id: "18",
      area: "운영 관리",
      action: "내부거래 등록 프로세스 운영 체계 구축",
      description: "내부거래 발생 시 즉시 등록 및 검증 프로세스 운영 체계 구축",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "19",
      area: "운영 관리",
      action: "내부거래 등록 검증 체계 구축",
      description: "등록된 내부거래의 정확성 및 완전성 검증 체계 구축",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "20",
      area: "운영 관리",
      action: "월별 정기 대사 프로세스 구축",
      description: "매월 말일 기준 내부거래 대사 정기 수행 및 결과 확인 프로세스 구축",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "21",
      area: "운영 관리",
      action: "분기별 상세 대사 프로세스 구축",
      description: "분기별 상세 대사 및 미대사 항목 분석 보고 프로세스 구축",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "22",
      area: "운영 관리",
      action: "미대사 항목 추적 시스템 운영",
      description: "미대사 항목 자동 추적 및 현황 모니터링 시스템 운영",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "23",
      area: "운영 관리",
      action: "미대사 항목 해소 프로세스 구축",
      description: "미대사 항목 발견 시 즉시 해소 프로세스 및 책임자 지정",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "24",
      area: "운영 관리",
      action: "내부거래 정산 일정 관리 체계 구축",
      description: "내부거래 정산 일정 수립 및 준수 관리 체계 구축",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "25",
      area: "운영 관리",
      action: "내부거래 정산 방법 정의",
      description: "정산 주기, 방법(계좌이체/상계 등) 및 절차 정의",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "26",
      area: "운영 관리",
      action: "해외자회사 대사 특별 프로세스 구축",
      description: "해외자회사 거래시 환율 적용, 시차 등 고려한 대사 프로세스 구축",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "27",
      area: "회계 처리",
      action: "내부거래 분개 기준 수립",
      description: "내부거래 회계 분개 작성 기준 및 방법 수립",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "28",
      area: "회계 처리",
      action: "환율 적용 회계 처리 기준 수립",
      description: "해외자회사 거래시 환율 적용 및 환율차이 회계 처리 기준 수립",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "29",
      area: "회계 처리",
      action: "내부거래 회계 처리 일원화",
      description: "법인 간 내부거래 회계 처리 방법 일원화",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "30",
      area: "회계 처리",
      action: "연결제거 대상 식별 프로세스 구축",
      description: "연결재무제표 작성시 제거 대상 내부거래 식별 기준 및 방법 수립",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "31",
      area: "회계 처리",
      action: "연결제거 분개 작성 프로세스 구축",
      description: "연결제거 분개 작성 기준 및 프로세스 수립",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "32",
      area: "회계 처리",
      action: "미실현 손익 제거 기준 수립",
      description: "재고에 포함된 내부거래 미실현 손익 제거 기준 및 방법 수립",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "33",
      area: "회계 처리",
      action: "내부거래 잔액 검증 프로세스 구축",
      description: "월말/분기말 내부거래 계정 잔액 검증 프로세스 구축",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "34",
      area: "리스크 관리",
      action: "내부거래 가격 검증 프로세스 구축",
      description: "내부거래 가격이 시장 가격과 일치하는지 정기 검증 프로세스 구축",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "35",
      area: "리스크 관리",
      action: "공정거래법 준수 체크리스트 운영",
      description: "공정거래법 위반 가능성 점검을 위한 체크리스트 운영",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "36",
      area: "리스크 관리",
      action: "내부거래 규모 모니터링 체계 구축",
      description: "내부거래 규모 및 비중 모니터링으로 리스크 사전 파악 체계 구축",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "37",
      area: "리스크 관리",
      action: "내부거래 리스크 평가 체계 구축",
      description: "정기적인 내부거래 리스크 평가 및 대응 방안 수립 체계 구축",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "38",
      area: "리스크 관리",
      action: "내부거래 감사 대응 체계 구축",
      description: "외부 감사 및 세무조사 대응을 위한 내부거래 자료 관리 체계 구축",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "39",
      area: "보고 및 모니터링",
      action: "월간 내부거래 현황 보고 체계 구축",
      description: "경영진/관리자 대상 월간 내부거래 현황 보고 체계 구축",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "40",
      area: "보고 및 모니터링",
      action: "분기별 내부거래 분석 보고 체계 구축",
      description: "경영진 대상 분기별 내부거래 분석 및 트렌드 보고 체계 구축",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "41",
      area: "보고 및 모니터링",
      action: "연간 내부거래 종합 보고 체계 구축",
      description: "이사회 대상 연간 내부거래 종합 보고서 작성 체계 구축",
      priority: "medium",
      timeline: "1주"
    },
    {
      id: "44",
      area: "보고 및 모니터링",
      action: "내부거래 대시보드 구축",
      description: "내부거래 현황을 한눈에 볼 수 있는 실시간 대시보드 구축",
      priority: "medium",
      timeline: "2-3주"
    },
    {
      id: "46",
      area: "SAP IC 계정 도입",
      action: "IC 계정 도입 계획 수립",
      description: "SAP IC 계정 도입 목표, 범위, 일정 및 예산 수립",
      priority: "high",
      timeline: "2주"
    },
    {
      id: "47",
      area: "SAP IC 계정 도입",
      action: "IC 파트너 마스터 데이터 구축",
      description: "모든 계열사를 IC 파트너로 등록 및 마스터 데이터 구축",
      priority: "high",
      timeline: "1개월"
    },
    {
      id: "48",
      area: "SAP IC 계정 도입",
      action: "IC 계정 체계 설계 및 설정",
      description: "내부매출/매입/채권/채무 계정 체계 설계 및 SAP 시스템 설정",
      priority: "high",
      timeline: "1-2개월"
    },
    {
      id: "49",
      area: "SAP IC 계정 도입",
      action: "IC 거래 유형 및 자동화 설정",
      description: "IC 전용 거래 유형 생성 및 자동 계정 할당 로직 구현",
      priority: "high",
      timeline: "1개월"
    },
    {
      id: "50",
      area: "SAP IC 계정 도입",
      action: "IC 파트너 필수 입력 필드 설정",
      description: "IC 계정 사용 시 IC 파트너 필수 입력으로 시스템 설정",
      priority: "high",
      timeline: "1주"
    },
    {
      id: "51",
      area: "SAP IC 계정 도입",
      action: "IC 대사 리포트 개발 및 테스트",
      description: "표준 리포트 검증 및 커스텀 리포트 필요 시 개발 및 테스트",
      priority: "medium",
      timeline: "2-3주"
    },
    {
      id: "52",
      area: "SAP IC 계정 도입",
      action: "연결제거 규칙 설정 (Group Reporting)",
      description: "SAP Group Reporting 사용 시 IC 제거 자동화 규칙 설정",
      priority: "medium",
      timeline: "2-3주"
    },
    {
      id: "53",
      area: "SAP IC 계정 도입",
      action: "사용자 교육 및 매뉴얼 작성",
      description: "재무팀, 회계팀 대상 IC 계정 사용법 교육 실시 및 매뉴얼 작성",
      priority: "medium",
      timeline: "2주"
    },
    {
      id: "54",
      area: "SAP IC 계정 도입",
      action: "파일럿 테스트 및 검증",
      description: "일부 법인/거래로 시범 운영 후 문제점 파악 및 개선",
      priority: "high",
      timeline: "1-2개월"
    },
    {
      id: "55",
      area: "SAP IC 계정 도입",
      action: "전면 적용 및 모니터링",
      description: "모든 법인에 IC 계정 전면 적용 및 초기 운영 모니터링",
      priority: "high",
      timeline: "1개월"
    }
  ]

  const toggleChecklist = (id: string) => {
    setChecklist(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    )
  }

  const getPriorityBadge = (priority: ActionItem["priority"]) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">높음</Badge>
      case "medium":
        return <Badge variant="warning">보통</Badge>
      default:
        return <Badge variant="secondary">낮음</Badge>
    }
  }

  const completedCount = checklist.filter(item => item.checked).length
  const totalCount = checklist.length
  const completionRate = Math.round((completedCount / totalCount) * 100)

  // 간트 차트를 위한 날짜 계산
  const parseTimeline = (timeline: string): number => {
    // "1주", "2주", "1-2개월", "2-3주" 등의 형식을 파싱
    if (timeline.includes("주")) {
      const weeks = timeline.match(/(\d+)/)?.[1]
      return weeks ? parseInt(weeks) : 1
    } else if (timeline.includes("개월")) {
      const months = timeline.match(/(\d+)/)?.[1]
      return months ? parseInt(months) * 4 : 4 // 1개월 = 4주로 계산
    }
    return 1
  }

  // 2024년 2월 첫주 월요일 (2월 5일)
  const projectStartDate = useMemo(() => {
    return startOfWeek(new Date(2024, 1, 5), { weekStartsOn: 1 })
  }, [])

  // 간트 차트 데이터 생성
  const ganttData = useMemo(() => {
    let currentDate = new Date(projectStartDate)
    const items: GanttItem[] = []
    const areaOrder: { [key: string]: number } = {
      "정책 및 절차": 1,
      "운영 관리": 2,
      "회계 처리": 2,
      "리스크 관리": 2,
      "보고 및 모니터링": 2,
      "시스템 업그레이드": 3,
      "SAP IC 계정 도입": 4
    }

    // 영역별로 그룹화하여 순차적으로 배치
    const groupedByArea = actionItems.reduce((acc, item) => {
      if (!acc[item.area]) acc[item.area] = []
      acc[item.area].push(item)
      return acc
    }, {} as { [key: string]: ActionItem[] })

    // 순서 번호별로 카테고리 그룹화
    const areasByOrder = Object.keys(groupedByArea).reduce((acc, area) => {
      const order = areaOrder[area] || 99
      if (!acc[order]) acc[order] = []
      acc[order].push(area)
      return acc
    }, {} as { [key: number]: string[] })

    // 순서 번호대로 처리
    const sortedOrders = Object.keys(areasByOrder)
      .map(Number)
      .sort((a, b) => a - b)

    sortedOrders.forEach(order => {
      const areasInOrder = areasByOrder[order]
      const orderStartDate = new Date(currentDate)
      let orderMaxEndDate = new Date(orderStartDate)
      
      // 같은 순서의 모든 카테고리는 동시에 시작
      areasInOrder.forEach(area => {
        const areaItems = groupedByArea[area]
        
        // "정책 및 절차" 카테고리에서 ID "8" 이후 항목들은 2월 4주차(프로젝트 시작일 + 3주)부터 시작
        if (area === "정책 및 절차") {
          const beforeId8 = areaItems.filter(item => parseInt(item.id) < 8)
          const fromId8 = areaItems.filter(item => parseInt(item.id) >= 8)
          
          // ID 8 이전 항목들은 기존대로 처리
          if (beforeId8.length > 0) {
            beforeId8.forEach(item => {
              const weeks = parseTimeline(item.timeline)
              const startDate = new Date(orderStartDate)
              const endDate = addWeeks(orderStartDate, weeks)
              
              items.push({
                id: item.id,
                area: item.area,
                action: item.action,
                startDate,
                endDate,
                priority: item.priority,
                timeline: item.timeline
              })
              
              if (endDate > orderMaxEndDate) {
                orderMaxEndDate = endDate
              }
            })
          }
          
          // ID 8부터는 2월 4주차(프로젝트 시작일 + 3주)부터 시작
          if (fromId8.length > 0) {
            const february4thWeek = addWeeks(projectStartDate, 3)
            fromId8.forEach(item => {
              const weeks = parseTimeline(item.timeline)
              const startDate = new Date(february4thWeek)
              const endDate = addWeeks(february4thWeek, weeks)
              
              items.push({
                id: item.id,
                area: item.area,
                action: item.action,
                startDate,
                endDate,
                priority: item.priority,
                timeline: item.timeline
              })
              
              if (endDate > orderMaxEndDate) {
                orderMaxEndDate = endDate
              }
            })
          }
        } else {
          // 다른 카테고리는 기존대로 처리
          areaItems.forEach(item => {
            // ID "13", "16"는 4월 4주차부터 시작
            // ID "14", "15", "35"는 5월 2주차부터 시작
            // ID "46" (IC 계정 도입 계획 수립)은 4월 1주차부터 시작
            // ID "47", "50"는 4월 3주차부터 시작
            // ID "44"는 6월 4주차부터 시작
            // ID "48", "49", "51", "52"는 6월 2주차부터 시작
            // ID "53", "54", "55"는 7월 1주차부터 시작
            let itemStartDate = new Date(orderStartDate)
            if (["13", "16"].includes(item.id)) {
              // 4월의 첫 번째 주를 찾고, 3주를 더한 것이 4월 4주차
              const aprilFirst = new Date(2024, 3, 1) // 4월 1일 (월은 0부터 시작)
              const aprilFirstWeek = startOfWeek(aprilFirst, { weekStartsOn: 1 })
              // 4월 1주차에서 3주를 더한 것이 4월 4주차
              itemStartDate = addWeeks(aprilFirstWeek, 3)
            } else if (["14", "15", "35"].includes(item.id)) {
              // 5월의 첫 번째 주를 찾고, 그 다음 주가 5월 2주차
              const mayFirst = new Date(2024, 4, 1) // 5월 1일 (월은 0부터 시작)
              const mayFirstWeek = startOfWeek(mayFirst, { weekStartsOn: 1 })
              // 5월 1주차의 다음 주가 5월 2주차
              itemStartDate = addWeeks(mayFirstWeek, 1)
            } else if (item.id === "46") {
              // 4월의 첫 번째 주를 찾음 (4월 1주차)
              const aprilFirst = new Date(2024, 3, 1) // 4월 1일 (월은 0부터 시작)
              const aprilFirstWeek = startOfWeek(aprilFirst, { weekStartsOn: 1 })
              // 4월 1주차
              itemStartDate = aprilFirstWeek
            } else if (["47", "50"].includes(item.id)) {
              // 4월의 첫 번째 주를 찾고, 2주를 더한 것이 4월 3주차
              const aprilFirst = new Date(2024, 3, 1) // 4월 1일 (월은 0부터 시작)
              const aprilFirstWeek = startOfWeek(aprilFirst, { weekStartsOn: 1 })
              // 4월 1주차에서 2주를 더한 것이 4월 3주차
              itemStartDate = addWeeks(aprilFirstWeek, 2)
            } else if (item.id === "44") {
              // 6월의 첫 번째 주를 찾고, 3주를 더한 것이 6월 4주차
              const juneFirst = new Date(2024, 5, 1) // 6월 1일 (월은 0부터 시작)
              const juneFirstWeek = startOfWeek(juneFirst, { weekStartsOn: 1 })
              // 6월 1주차에서 3주를 더한 것이 6월 4주차
              itemStartDate = addWeeks(juneFirstWeek, 3)
            } else if (["48", "49", "51", "52"].includes(item.id)) {
              // 6월의 첫 번째 주를 찾고, 그 다음 주가 6월 2주차
              const juneFirst = new Date(2024, 5, 1) // 6월 1일 (월은 0부터 시작)
              const juneFirstWeek = startOfWeek(juneFirst, { weekStartsOn: 1 })
              // 6월 1주차의 다음 주가 6월 2주차
              itemStartDate = addWeeks(juneFirstWeek, 1)
            } else if (["53", "54", "55"].includes(item.id)) {
              // 7월의 첫 번째 주를 찾음 (7월 1주차)
              const julyFirst = new Date(2024, 6, 1) // 7월 1일 (월은 0부터 시작)
              const julyFirstWeek = startOfWeek(julyFirst, { weekStartsOn: 1 })
              // 7월 1주차
              itemStartDate = julyFirstWeek
            }
            
            const weeks = parseTimeline(item.timeline)
            const startDate = new Date(itemStartDate)
            const endDate = addWeeks(itemStartDate, weeks)
            
            items.push({
              id: item.id,
              area: item.area,
              action: item.action,
              startDate,
              endDate,
              priority: item.priority,
              timeline: item.timeline
            })
            
            if (endDate > orderMaxEndDate) {
              orderMaxEndDate = endDate
            }
          })
        }
      })
      
      // 다음 순서는 현재 순서의 최대 종료일 다음 주부터 시작
      currentDate = addWeeks(orderMaxEndDate, 1)
    })

    return items
  }, [actionItems, projectStartDate])

  // 간트 차트 전체 기간 계산
  const totalWeeks = useMemo(() => {
    if (ganttData.length === 0) return 12
    const lastItem = ganttData[ganttData.length - 1]
    return differenceInWeeks(lastItem.endDate, projectStartDate) + 2
  }, [ganttData, projectStartDate])

  // 주차별 날짜 생성
  const weekDates = useMemo(() => {
    const dates: Date[] = []
    for (let i = 0; i < totalWeeks; i++) {
      dates.push(addWeeks(projectStartDate, i))
    }
    return dates
  }, [totalWeeks, projectStartDate])

  // 영역별 색상
  const getAreaColor = (area: string) => {
    const colors: { [key: string]: string } = {
      "정책 및 절차": "bg-blue-500",
      "시스템 업그레이드": "bg-purple-500",
      "운영 관리": "bg-green-500",
      "회계 처리": "bg-orange-500",
      "리스크 관리": "bg-red-500",
      "보고 및 모니터링": "bg-cyan-500",
      "SAP IC 계정 도입": "bg-pink-500"
    }
    return colors[area] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">내부거래 관리 가이드</h1>
          <p className="text-muted-foreground text-lg mb-4">
            그룹 내부거래 관리 고도화 방안 및 체크리스트
          </p>
          <div className="flex items-center gap-4">
            <Card className="flex-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">체크리스트 진행률</p>
                    <p className="text-2xl font-bold">{completionRate}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {completedCount} / {totalCount} 완료
                    </p>
                  </div>
                </div>
                <div className="mt-2 w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="policy">정책 가이드</TabsTrigger>
            <TabsTrigger value="checklist">체크리스트</TabsTrigger>
            <TabsTrigger value="action-plan">추진 방안</TabsTrigger>
            <TabsTrigger value="schedule">추진 일정</TabsTrigger>
            <TabsTrigger value="best-practices">모범 사례</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    관리 영역
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5개</div>
                  <p className="text-xs text-muted-foreground">
                    정책, 시스템, 운영, 회계, 리스크
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    체크리스트 항목
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCount}개</div>
                  <p className="text-xs text-muted-foreground">
                    필수 관리 항목
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    추진 과제
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{actionItems.length}개</div>
                  <p className="text-xs text-muted-foreground">
                    우선순위 과제
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    완료율
                  </CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{completionRate}%</div>
                  <p className="text-xs text-muted-foreground">
                    체크리스트 진행률
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    내부거래 관리의 목적
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>법인 간 거래 투명성 확보</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>연결재무제표 정확성 제고</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>공정거래법 준수</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>리스크 관리 및 감사 대응</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    주요 관리 영역
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm">1. 정책 및 절차</p>
                      <p className="text-xs text-muted-foreground">
                        내부거래 정책 수립 및 승인 프로세스 정의
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm">2. 시스템 구축</p>
                      <p className="text-xs text-muted-foreground">
                        내부거래 관리 시스템 및 자동화 도구 구축
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm">3. 운영 관리</p>
                      <p className="text-xs text-muted-foreground">
                        일상적인 내부거래 등록, 대사, 정산 운영
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm">4. 회계 처리</p>
                      <p className="text-xs text-muted-foreground">
                        내부거래 회계 처리 및 연결제거
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-semibold text-sm">5. 리스크 관리</p>
                      <p className="text-xs text-muted-foreground">
                        공정거래 리스크 및 이상 거래 관리
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="policy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>내부거래 정책 수립 가이드</CardTitle>
                <CardDescription>
                  실무에서 바로 적용 가능한 내부거래 정책 수립 방안
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">1. 내부거래 정의 및 범위</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">정의</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        내부거래는 동일 그룹 내 계열사 간 발생하는 모든 거래를 의미합니다.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">포함되는 거래:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                          <li>제품/서비스 판매 및 구매</li>
                          <li>임대료, 관리비 등 공통비 분담</li>
                          <li>자금 대출 및 차입</li>
                          <li>지적재산권 사용료</li>
                          <li>인력 파견 및 서비스 제공</li>
                          <li>기타 그룹 내 거래</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">2. 내부거래 등록 및 관리</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">필수 등록 정보</h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>항목</TableHead>
                              <TableHead>내용</TableHead>
                              <TableHead>필수 여부</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">거래 상대방</TableCell>
                              <TableCell>계열사 코드 및 법인명</TableCell>
                              <TableCell><Badge variant="destructive">필수</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">거래 유형</TableCell>
                              <TableCell>제품/서비스/금융/공통비 등</TableCell>
                              <TableCell><Badge variant="destructive">필수</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">거래 금액</TableCell>
                              <TableCell>거래통화 기준 금액</TableCell>
                              <TableCell><Badge variant="destructive">필수</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">거래 일자</TableCell>
                              <TableCell>거래 발생 일자</TableCell>
                              <TableCell><Badge variant="destructive">필수</Badge></TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">가격 결정 근거</TableCell>
                              <TableCell>시장가격/원가+마진 등</TableCell>
                              <TableCell><Badge variant="warning">선택</Badge></TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">등록 시점</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">거래 발생 시 즉시 등록</p>
                            <p className="text-xs text-muted-foreground">거래 발생일로부터 3영업일 이내 등록 권장</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                          <div>
                            <p className="font-medium">월말 마감 전 일괄 등록 금지</p>
                            <p className="text-xs text-muted-foreground">실시간 등록으로 미대사 항목 최소화</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">3. 내부거래 대사 프로세스</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">대사 주기 및 방법</h4>
                      <div className="space-y-2">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm">월별 대사 (필수)</p>
                          <p className="text-xs text-muted-foreground">
                            매월 말일 기준으로 양쪽 법인의 내부거래 잔액을 대사하고 미대사 항목을 추적
                          </p>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm">분기별 대사 (권장)</p>
                          <p className="text-xs text-muted-foreground">
                            분기 말에 상세 대사 및 미대사 항목 해소 계획 수립
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">미대사 항목 처리</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <div>
                            <p className="font-medium">1주일 이내: 양쪽 법인 확인 및 조정</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                          <div>
                            <p className="font-medium">1개월 이내: 사업부/본사 회계팀 개입</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          <div>
                            <p className="font-medium">3개월 이상: 경영진 보고 및 특별 조치</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">4. 내부거래 회계 처리</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">계정 체계</h4>
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="p-3 border rounded-lg">
                          <p className="font-medium text-sm mb-2">매출 측</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• 내부매출 (수익)</li>
                            <li>• 내부매출채권 (자산)</li>
                          </ul>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <p className="font-medium text-sm mb-2">매입 측</p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• 내부매입 (비용)</li>
                            <li>• 내부매입채무 (부채)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">연결제거 원칙</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        연결재무제표 작성을 위해 내부거래는 다음과 같이 제거됩니다:
                      </p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                        <li>내부매출과 내부매입 상계 제거</li>
                        <li>내부매출채권과 내부매입채무 상계 제거</li>
                        <li>미실현 손익 제거 (재고에 포함된 내부거래 이익)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">5. SAP IC 계정 도입 가이드</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg bg-primary/5">
                      <h4 className="font-semibold mb-2">SAP IC 계정 도입의 목적</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                        <li>내부거래 자동 대사 및 추적</li>
                        <li>연결제거 프로세스 자동화</li>
                        <li>내부거래 현황 실시간 모니터링</li>
                        <li>공정거래 리스크 관리 효율화</li>
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">SAP IC 계정 구조 설계</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">1. IC 파트너 마스터 설정</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• 각 계열사를 IC 파트너로 등록 (Transaction: XK01)</p>
                            <p>• IC 파트너 그룹화 (예: 국내/해외, 사업부별)</p>
                            <p>• IC 파트너 코드 체계 정의 (예: IC001, IC002)</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">2. IC 계정 체계 구성</p>
                          <div className="rounded-md border mt-2">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>계정 유형</TableHead>
                                  <TableHead>계정 범주</TableHead>
                                  <TableHead>설명</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">내부매출</TableCell>
                                  <TableCell>수익 계정</TableCell>
                                  <TableCell className="text-sm">계열사에 대한 매출</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">내부매입</TableCell>
                                  <TableCell>비용 계정</TableCell>
                                  <TableCell className="text-sm">계열사로부터의 매입</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">내부매출채권</TableCell>
                                  <TableCell>자산 계정</TableCell>
                                  <TableCell className="text-sm">계열사에 대한 채권</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">내부매입채무</TableCell>
                                  <TableCell>부채 계정</TableCell>
                                  <TableCell className="text-sm">계열사에 대한 채무</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">3. 계정 코드 예시</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• 내부매출: 4XXX-IC-XXX (4: 수익 계정, IC: 내부거래 식별)</p>
                            <p>• 내부매입: 5XXX-IC-XXX (5: 비용 계정, IC: 내부거래 식별)</p>
                            <p>• 내부매출채권: 1XXX-IC-XXX (1: 자산 계정)</p>
                            <p>• 내부매입채무: 2XXX-IC-XXX (2: 부채 계정)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">IC 거래 입력 및 처리</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">1. 표준 프로세스 (권장)</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• 판매 주문 생성 시 IC 파트너 자동 식별</p>
                            <p>• 납품 시 자동으로 IC 계정으로 회계 처리</p>
                            <p>• IC 파트너 필드 필수 입력으로 누락 방지</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">2. 수동 분개 (일반 회계 거래)</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• Transaction: FB01 (일반 분개 입력)</p>
                            <p>• IC 파트너 필드 반드시 입력</p>
                            <p>• IC 계정 코드 사용 (예: 4XXX-IC-001)</p>
                            <p>• 거래 통화 및 금액 정확히 입력</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">3. IC 전용 거래 유형 설정</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• Transaction: OBA7 (거래 유형 정의)</p>
                            <p>• IC 거래 전용 거래 유형 생성 (예: IC01, IC02)</p>
                            <p>• 자동 IC 계정 할당 설정</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">IC 대사 프로세스</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">1. 자동 대사 기능 활용</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• Transaction: F.33 또는 FAGLFLEXT (잔액 확인)</p>
                            <p>• IC 파트너별 잔액 추출 및 비교</p>
                            <p>• 미대사 항목 자동 리스트 생성</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">2. IC 대사 리포트 활용</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• 표준 리포트: S_ALR_87012328 (IC 대사 리포트)</p>
                            <p>• IC 파트너별/계정별/기간별 조회 가능</p>
                            <p>• 대사 불일치 항목 하이라이트 표시</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">3. 대사 프로세스 체크리스트</p>
                          <div className="rounded-md border mt-2">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>단계</TableHead>
                                  <TableHead>작업</TableHead>
                                  <TableHead>Transaction/프로그램</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="font-medium">1단계</TableCell>
                                  <TableCell className="text-sm">IC 잔액 추출</TableCell>
                                  <TableCell className="text-xs">F.33 / S_ALR_87012328</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">2단계</TableCell>
                                  <TableCell className="text-sm">상대방 법인과 대사</TableCell>
                                  <TableCell className="text-xs">Excel/Access 비교</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">3단계</TableCell>
                                  <TableCell className="text-sm">미대사 항목 조정</TableCell>
                                  <TableCell className="text-xs">FB01 (조정 분개)</TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell className="font-medium">4단계</TableCell>
                                  <TableCell className="text-sm">대사 완료 확인</TableCell>
                                  <TableCell className="text-xs">F.33 재확인</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">SAP Group Reporting을 활용한 연결제거</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">1. IC 제거 자동화</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• SAP Group Reporting의 자동 제거 규칙 설정</p>
                            <p>• IC 파트너 기준 자동 매칭 및 제거</p>
                            <p>• 제거 분개 자동 생성</p>
                          </div>
                        </div>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="font-medium text-sm mb-2">2. 제거 규칙 설정</p>
                          <div className="text-xs text-muted-foreground space-y-1 ml-4">
                            <p>• 내부매출 ↔ 내부매입 상계 제거</p>
                            <p>• 내부매출채권 ↔ 내부매입채무 상계 제거</p>
                            <p>• 재고 미실현 손익 제거 (상세 규칙 필요)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-950">
                      <h4 className="font-semibold mb-2">⚠️ 주의사항</h4>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 ml-4">
                        <li>IC 파트너 입력 누락 시 IC 대사가 불가능하므로 필수 입력 필드로 설정 권장</li>
                        <li>IC 계정과 일반 계정 구분을 명확히 하여 오입력 방지</li>
                        <li>거래 통화가 다른 경우 통화 변환 주의</li>
                        <li>IC 제거는 연결재무제표 작성 시에만 수행 (개별 법인 재무제표에는 미포함)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">6. 모니터링 및 보고</h3>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-3">정기 보고</h4>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>보고 주기</TableHead>
                              <TableHead>보고 대상</TableHead>
                              <TableHead>주요 내용</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">월간</TableCell>
                              <TableCell>본사 회계팀</TableCell>
                              <TableCell className="text-sm">내부거래 현황, 미대사 항목</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">분기별</TableCell>
                              <TableCell>경영진</TableCell>
                              <TableCell className="text-sm">내부거래 집계, 리스크 분석</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="font-medium">연간</TableCell>
                              <TableCell>이사회</TableCell>
                              <TableCell className="text-sm">연간 내부거래 현황, 정책 준수 현황</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">KPI 지표</h4>
                      <div className="grid gap-2 md:grid-cols-3">
                        <div className="p-3 border rounded-lg text-center">
                          <p className="text-lg font-bold text-primary">95% 이상</p>
                          <p className="text-xs text-muted-foreground">대사 일치율</p>
                        </div>
                        <div className="p-3 border rounded-lg text-center">
                          <p className="text-lg font-bold text-primary">5일 이내</p>
                          <p className="text-xs text-muted-foreground">미대사 해소 기간</p>
                        </div>
                        <div className="p-3 border rounded-lg text-center">
                          <p className="text-lg font-bold text-primary">100%</p>
                          <p className="text-xs text-muted-foreground">정책 준수율</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checklist" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>내부거래 관리 체크리스트</CardTitle>
                <CardDescription>
                  내부거래 관리를 위해 필수적으로 수행해야 할 항목들
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12"></TableHead>
                        <TableHead>카테고리</TableHead>
                        <TableHead>항목</TableHead>
                        <TableHead>설명</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {checklist.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Checkbox
                              checked={item.checked}
                              onCheckedChange={() => toggleChecklist(item.id)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.category}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {item.checked ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <AlertCircle className="h-4 w-4 text-yellow-500" />
                              )}
                              <span className={item.checked ? "line-through text-muted-foreground" : ""}>
                                {item.item}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.description}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="action-plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>내부거래 관리 고도화 추진 방안</CardTitle>
                <CardDescription>
                  단계별 추진 과제 및 우선순위
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>영역</TableHead>
                        <TableHead>과제</TableHead>
                        <TableHead>설명</TableHead>
                        <TableHead className="w-24">우선순위</TableHead>
                        <TableHead className="w-32">예상 기간</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {actionItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.area}
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">{item.action}</span>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {item.description}
                          </TableCell>
                          <TableCell>
                            {getPriorityBadge(item.priority)}
                          </TableCell>
                          <TableCell className="text-sm">
                            {item.timeline}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  추진 일정
                </CardTitle>
                <CardDescription>
                  내부거래 관리 고도화 추진 일정
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto pb-4">
                  <div style={{ minWidth: `${250 + totalWeeks * 50}px` }}>
                    {/* 간트 차트 헤더 - 월별 */}
                    <div className="border-b-2 border-primary mb-1 bg-muted/30 sticky top-0 z-10">
                      <div className="flex">
                        <div className="w-64 p-2 font-semibold text-sm border-r bg-background flex-shrink-0"></div>
                        <div className="flex">
                          {weekDates.map((date, idx) => {
                            const isFirstOfMonth = date.getDate() <= 7
                            const monthLabel = isFirstOfMonth ? format(date, "M월") : ""
                            return (
                              <div key={idx} className={`w-[50px] p-1 text-xs text-center border-l bg-background ${isFirstOfMonth ? "border-l-2 border-l-primary" : ""}`}>
                                {monthLabel && <div className="font-bold text-primary mb-1">{monthLabel}</div>}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 간트 차트 헤더 - 주차 */}
                    <div className="border-b-2 border-primary mb-2 bg-muted/30 sticky top-[40px] z-10">
                      <div className="flex">
                        <div className="w-64 p-3 font-semibold text-sm border-r bg-background flex-shrink-0">과제</div>
                        <div className="flex">
                          {weekDates.map((date, idx) => {
                            // 각 달의 첫 번째 주를 기준으로 주차 계산
                            const monthStart = startOfMonth(date)
                            const monthStartWeek = startOfWeek(monthStart, { weekStartsOn: 1 })
                            const currentWeek = startOfWeek(date, { weekStartsOn: 1 })
                            const weekInMonth = Math.floor((currentWeek.getTime() - monthStartWeek.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
                            return (
                              <div key={idx} className="w-[50px] p-1 text-xs text-center border-l bg-background">
                                <div className="font-medium">{weekInMonth}주차</div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 간트 차트 바디 */}
                    <div className="space-y-0.5">
                      {Object.entries(
                        ganttData.reduce((acc, item) => {
                          if (!acc[item.area]) acc[item.area] = []
                          acc[item.area].push(item)
                          return acc
                        }, {} as { [key: string]: GanttItem[] })
                      ).map(([area, items]) => (
                        <div key={area} className="space-y-0.5">
                          {/* 영역 헤더 */}
                          <div className="flex border-b">
                            <div className={`w-64 p-2 font-semibold text-sm text-white flex-shrink-0 ${getAreaColor(area)}`}>
                              {area}
                            </div>
                            <div className="flex border-l">
                              {weekDates.map((_, idx) => (
                                <div key={idx} className="w-[50px] border-l"></div>
                              ))}
                            </div>
                          </div>
                          
                          {/* 영역 내 항목들 */}
                          {items.map((item) => {
                            const startWeek = Math.max(0, differenceInWeeks(item.startDate, projectStartDate))
                            const duration = Math.max(1, differenceInWeeks(item.endDate, item.startDate))
                            const weekWidth = 50 // 각 주의 너비 (px)
                            const left = startWeek * weekWidth
                            const width = duration * weekWidth

                            return (
                              <div key={item.id} className="flex relative border-b">
                                <div className="w-64 p-2 text-sm flex items-center border-r bg-muted/20 flex-shrink-0">
                                  <span className="truncate text-xs">{item.action}</span>
                                </div>
                                <div className="relative h-10 border-l" style={{ width: `${totalWeeks * weekWidth}px` }}>
                                  {/* 월별 구분선 */}
                                  {weekDates.map((date, idx) => {
                                    const isFirstOfMonth = date.getDate() <= 7
                                    return isFirstOfMonth ? (
                                      <div
                                        key={idx}
                                        className="absolute top-0 bottom-0 border-l-2 border-l-primary/30 z-0"
                                        style={{ left: `${idx * weekWidth}px` }}
                                      />
                                    ) : null
                                  })}
                                  {/* 간트 바 */}
                                  <div
                                    className={`absolute top-1 h-8 rounded-md ${getAreaColor(item.area)} opacity-85 hover:opacity-100 hover:scale-105 transition-all flex items-center px-2 text-white text-[10px] font-medium shadow-md cursor-pointer border border-white/20 z-10`}
                                    style={{
                                      left: `${left}px`,
                                      width: `${Math.max(width, 50)}px`
                                    }}
                                    title={`${item.action}\n${format(item.startDate, "yyyy-MM-dd")} ~ ${format(item.endDate, "yyyy-MM-dd")}\n기간: ${item.timeline}`}
                                  >
                                    {width > 80 && (
                                      <span className="truncate">{item.action}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 범례 */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-semibold mb-3 text-sm">영역별 색상</h4>
                  <div className="flex flex-wrap gap-3">
                    {["정책 및 절차", "시스템 업그레이드", "운영 관리", "회계 처리", "리스크 관리", "보고 및 모니터링", "SAP IC 계정 도입"].map((area) => (
                      <div key={area} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${getAreaColor(area)}`}></div>
                        <span className="text-sm">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="best-practices" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>효과적인 내부거래 관리 원칙</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. 명확한 정책 수립</h4>
                    <p className="text-sm text-muted-foreground">
                      내부거래 승인 기준, 가격 정책, 회계 처리 방법 등을 명확히 정의하고 문서화
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. 시스템 자동화</h4>
                    <p className="text-sm text-muted-foreground">
                      내부거래 등록부터 대사, 정산까지 가능한 한 자동화하여 인력 부담 감소 및 오류 방지
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3. 정기적인 모니터링</h4>
                    <p className="text-sm text-muted-foreground">
                      월별/분기별 정기 대사 및 미대사 항목 추적으로 문제를 조기에 발견
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">4. 책임자 명확화</h4>
                    <p className="text-sm text-muted-foreground">
                      각 법인/사업부별 내부거래 관리 담당자 지정 및 역할 명확화
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>주의해야 할 사항</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">1. 공정거래법 위반 리스크</h4>
                    <p className="text-sm text-muted-foreground">
                      내부거래 가격이 시장 가격과 크게 차이나는 경우 공정거래법 위반 가능성
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">2. 미대사 누적</h4>
                    <p className="text-sm text-muted-foreground">
                      미대사 항목이 누적되면 연결재무제표 신뢰성 저하 및 감사 이슈 발생
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">3. 회계 처리 일관성</h4>
                    <p className="text-sm text-muted-foreground">
                      법인별로 상이한 회계 처리 방법 사용 시 연결제거 어려움 초래
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">4. 시스템 분산</h4>
                    <p className="text-sm text-muted-foreground">
                      법인별로 다른 시스템 사용 시 통합 관리 및 모니터링 어려움
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>실제 기업 사례: 내부거래 관리 모범 사례</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2 text-primary">삼성그룹: SAP 기반 통합 내부거래 관리 시스템</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>핵심 전략:</strong> SAP Group Reporting을 활용한 전 계열사 통합 내부거래 관리
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>150개 이상 계열사의 내부거래를 SAP IC 계정으로 통합 관리</li>
                      <li>월별 자동 대사 프로세스로 대사 시간 70% 단축</li>
                      <li>실시간 연결제거 자동화로 분기 결산 기간 단축</li>
                      <li>중앙화된 내부거래 정책으로 처리 일관성 확보</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2 text-primary">LG그룹: 자동화 기반 효율성 향상</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>핵심 전략:</strong> 내부거래 대사 자동화 및 실시간 모니터링 체계 구축
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>내부거래 대사 자동화 시스템으로 월별 대사 시간 80% 단축</li>
                      <li>실시간 대시보드를 통한 미대사 항목 조기 발견 및 해결</li>
                      <li>분기 말 미대사 항목 90% 감소 달성</li>
                      <li>거래 통화 기준 관리로 환율 차이 명확화</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2 text-primary">SK그룹: 통합 정책 및 시스템 구축</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>핵심 전략:</strong> 그룹 전반의 통일된 내부거래 정책 및 중앙화된 관리 시스템
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>내부거래 승인 기준 및 가격 정책을 그룹 차원에서 표준화</li>
                      <li>모든 계열사의 내부거래를 중앙 시스템에서 일괄 모니터링</li>
                      <li>정기적인 내부거래 감사로 공정거래법 위반 리스크 사전 차단</li>
                      <li>연결제거 프로세스 자동화로 재무제표 신뢰성 향상</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-muted/30">
                    <h4 className="font-semibold mb-2 text-primary">현대자동차그룹: 해외 법인 내부거래 관리 고도화</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>핵심 전략:</strong> 거래 통화 기준 관리 및 다중 환율 처리 체계
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li>해외 자회사 거래 시 거래 통화(TC) 기준 대사 원칙 수립</li>
                      <li>거래 통화 → 기능 통화 → 그룹 통화 환율 차이 명확히 분리</li>
                      <li>월별 자동 대사로 내부거래 일치율 95% 이상 유지</li>
                      <li>환율 변환 차이를 별도 계정으로 관리하여 내부거래와 분리</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                    <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">공통 성공 요인</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
                      <li><strong>중앙화된 시스템:</strong> SAP 등 ERP 시스템을 통한 통합 관리</li>
                      <li><strong>자동화 프로세스:</strong> 대사, 연결제거 등 반복 작업 자동화</li>
                      <li><strong>표준화된 정책:</strong> 그룹 전반의 통일된 내부거래 정책</li>
                      <li><strong>실시간 모니터링:</strong> 대시보드를 통한 지속적 추적 및 관리</li>
                      <li><strong>명확한 역할 분담:</strong> 법인별 담당자 지정 및 책임 명확화</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}